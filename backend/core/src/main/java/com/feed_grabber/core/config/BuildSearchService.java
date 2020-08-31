package com.feed_grabber.core.config;

import org.hibernate.search.jpa.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;

import javax.persistence.EntityManager;

public class BuildSearchService implements ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    EntityManager entityManager;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        var fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        try {
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (InterruptedException e) {
            System.out.println("An error occurred trying to build the search index: " + e.toString());
        }
    }
}
