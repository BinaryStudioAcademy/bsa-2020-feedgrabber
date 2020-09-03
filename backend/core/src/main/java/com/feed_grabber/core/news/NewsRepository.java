package com.feed_grabber.core.news;

import com.feed_grabber.core.news.dto.NewsDto;
import com.feed_grabber.core.news.model.News;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NewsRepository extends JpaRepository<News, UUID> {

    @Query("SELECT n FROM News n WHERE n.company.id = :companyId")
    List<News> findAllNews(@Param("companyId") UUID companyId, Pageable pageable);

    Long countAllByCompanyId(UUID companyId);
}
