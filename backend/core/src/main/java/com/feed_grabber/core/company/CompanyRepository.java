package com.feed_grabber.core.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {
    @Query(
            value = "select * from companies c join users u on u.company_id = c.id where u.email = :email",
            nativeQuery = true)
    List<Company> findAllByUserEmail(String email);

    boolean existsByName(String uuid);

    Optional<Company> findCompanyBySubdomainName(String subdomain);

    Optional<Company> findByName(String name);
}
