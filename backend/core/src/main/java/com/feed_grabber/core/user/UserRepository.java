package com.feed_grabber.core.user;

import com.feed_grabber.core.dashboard.dto.UserInfo;
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
            "and (lower(p.last_name) like :name or lower(p.first_name) like :name or lower(u.username) like :name) " +
            " order by p.last_name, p.first_name, u.username ",
            nativeQuery = true)
    List<User> findByLastNameBeginAndCompanyId(UUID companyId, String name, Pageable pageable);

    @Query(value = "select * from users u inner join companies c on u.company_id = c.id " +
            "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
            "and ((lower(p.last_name) like :surname and lower(p.first_name) like :name) OR " +
            "(lower(p.last_name) like :name and lower(p.first_name) like :surname)) " +
            "order by p.last_name, p.first_name, u.username ",
            nativeQuery = true)
    List<User> findByNameAndLastNameAndCompanyId(UUID companyId, String name, String surname, Pageable pageable);

    @Query(value = "select count(*) " +
            "from (select * from users u inner join companies c on u.company_id = c.id " +
            "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
            "and (lower(p.last_name) like :name or lower(p.first_name) like :name " +
            "   or lower(u.username) like :name)) as subquery",
            nativeQuery = true)
    Long countByNameBeginAndCompanyId(UUID companyId, String name);

    @Query(value = "select count(*) " +
            "from (select * from users u inner join companies c on u.company_id = c.id " +
            "left join user_profiles p on u.id = p.user_id where c.id = :companyId " +
            "and ((lower(p.last_name) like :surname and lower(p.first_name) like :name) OR " +
            "(lower(p.last_name) like :name and lower(p.first_name) like :surname))) as subquery",
            nativeQuery = true)
    Long countByLastNameAndNameAndCompanyId(UUID companyId, String name, String surname);

    @Query(value = "select new com.feed_grabber.core.dashboard.dto.UserInfo(" +
            "   u.id, u.username, p.firstName, p.lastName, u.role.name, " +
            "   (select case when count (t) > 0 THEN true ELSE false END from Team t where t.lead.id = u.id)) " +
            "from User u inner join Company c on u.company.id = c.id " +
            "left join UserProfile p on u.id = p.user.id " +
            "where c.id = :companyId")
    List<UserInfo> getUserInfo(UUID companyId);

}
