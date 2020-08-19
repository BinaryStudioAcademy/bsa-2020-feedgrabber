package com.feed_grabber.core.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {
    @Value("${amazon.accessKey}")
    String accessKey;
    @Value("${amazon.secretKey}")
    String accessSecret;

    @Bean
    public AmazonS3Client generateS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(accessKey,accessSecret);
        AmazonS3Client client = new AmazonS3Client(credentials);
        return client;
    }
}