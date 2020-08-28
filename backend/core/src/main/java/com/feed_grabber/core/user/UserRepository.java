package com.feed_grabber.core.user;

import com.feed_grabber.core.user.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    // TODO rewrite to take companyId
    Optional<User> findByUsername(String username);

    // TODO rewrite to take companyId
    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndCompanyIdOrEmailAndCompanyId
            (String username, UUID companyId1, String email, UUID companyId2);

    Optional<User> findByCompanyIdAndEmail(UUID companyId, String email);

    Optional<User> findByUsernameAndCompanyId(String username, UUID companyId);

    List<User> findAllByCompanyId(UUID companyId);

    Long countAllByCompanyId(UUID companyId);

    @Query("FROM User u inner join Company c ON u.company = c " +
            "left join UserProfile p ON u.userProfile = p " +
            "where c.id = :companyId " +
            "ORDER BY p.lastName, p.firstName, u.username")
    List<User> findAllByCompanyId(UUID companyId, Pageable pageable);

    @Query(value = "select * from users u inner join companies c on u.company_id = c.id " +
        "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
        "and lower(p.last_name) like :lastName order by p.last_name, u.username ",
        nativeQuery = true)
    List<User> findByLastNameBeginAndCompanyId(UUID companyId, String lastName, Pageable pageable);

    @Query(value = "select * from users u inner join companies c on u.company_id = c.id " +
            "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
            "and lower(p.last_name) like :surname and lower(p.first_name) like :name " +
            "order by p.last_name, u.username ",
            nativeQuery = true)
    List<User> findByNameAndLastNameAndCompanyId(UUID companyId, String name, String surname, Pageable pageable);

    @Query(value = "select count(*) " +
            "from (select * from users u inner join companies c on u.company_id = c.id " +
            "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
            "and lower(p.last_name) like :surnameBeginning " +
            "order by p.last_name, u.username ) as subquery",
            nativeQuery = true)
    Long countByLastNameBeginAndCompanyId(UUID companyId, String surnameBeginning);

    @Query(value = "select count(*) " +
            "from (select * from users u inner join companies c on u.company_id = c.id " +
            "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
            "and lower(p.last_name) like :surname and lower(p.first_name) like :name " +
            " order by p.last_name, u.username ) as subquery",
            nativeQuery = true)
    Long countByLastNameAndNameAndCompanyId(UUID companyId, String name, String surname);

}
