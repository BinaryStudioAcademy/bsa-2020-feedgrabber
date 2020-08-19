package com.feed_grabber.core.file;

import com.feed_grabber.core.file.model.S3File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FileRepository extends JpaRepository<S3File, UUID> {

}
