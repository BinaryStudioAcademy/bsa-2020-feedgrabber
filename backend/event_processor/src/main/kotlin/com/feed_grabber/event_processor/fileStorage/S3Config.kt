package com.feed_grabber.event_processor.fileStorage

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import java.net.URI


@Configuration
class InfrastructureConfiguration() {

    @Value("\${amazon.accessKey}")
    private lateinit var ACCESS_KEY: String

    @Value("\${amazon.secretKey}")
    private lateinit var SECRET_KEY: String

    @Value("\${amazon.endpointUrl}")
    private lateinit var ENDPOINT_URL: String

    private val region: String = "eu-central-1"

    @Bean
    fun s3Client(): S3Client {
        val credentials = AwsBasicCredentials.create(ACCESS_KEY, SECRET_KEY)
        val credentialsProvider = StaticCredentialsProvider.create(credentials)
        return S3Client.builder()
                .credentialsProvider(credentialsProvider)
                .endpointOverride(URI.create(ENDPOINT_URL))
                .region(Region.of(region))
                .build()
    }
}