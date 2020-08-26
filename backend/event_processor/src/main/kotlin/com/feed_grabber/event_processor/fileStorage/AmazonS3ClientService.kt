package com.feed_grabber.event_processor.fileStorage


import com.feed_grabber.event_processor.report.dto.ReportFileCreationResponseDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.ObjectCannedACL
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.io.File
import java.io.OutputStream
import java.time.LocalDateTime
import java.util.*


@Service
class AmazonS3ClientService(private val s3Client: S3Client) {

    @Value("\${amazon.bucketName}")
    private lateinit var BUCKET_NAME: String

    @Value("\${amazon.endpointUrl}")
    private lateinit var ENDPOINT: String

    fun uploadReport(file: File, requestId: UUID): ReportFileCreationResponseDto {
        return putObject(file, requestId, "reports/")
    }

    fun putObject(file: File, requestId: UUID, prefix: String): ReportFileCreationResponseDto {
        val key = prefix + file.name?.replace(" ", "_") ?: UUID.randomUUID().toString()
        val request = PutObjectRequest.builder().bucket(BUCKET_NAME).key(key).acl(ObjectCannedACL.PUBLIC_READ).build()
        val fis = file.inputStream();
        val requestBody = RequestBody.fromInputStream(fis, file.length())
        s3Client.putObject(request, requestBody)
        fis.close()
        return ReportFileCreationResponseDto(requestId, "$ENDPOINT$BUCKET_NAME/$key", key)
    }

}
