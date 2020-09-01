package com.feed_grabber.event_processor.fileStorage


import com.feed_grabber.event_processor.report.dto.ReportFileCreationDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.ObjectCannedACL
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.io.File
import java.io.InputStream
import java.util.*


@Service
class AmazonS3ClientService(private val s3Client: S3Client) {

    @Value("\${amazon.bucketName}")
    private lateinit var BUCKET_NAME: String

    @Value("\${amazon.endpointUrl}")
    private lateinit var ENDPOINT: String

    fun uploadReport(file: InputStream, requestId: UUID, name: String): ReportFileCreationDto {
        return putObject(file, requestId, "reports/", name)
    }


    fun putObject(file: File, requestId: UUID, prefix: String): ReportFileCreationDto {
        val key = prefix + file.name?.replace(" ", "_") ?: UUID.randomUUID().toString()
        val request = PutObjectRequest.builder().bucket(BUCKET_NAME).key(key).acl(ObjectCannedACL.PUBLIC_READ).build()
        val fis = file.inputStream();
        val requestBody = RequestBody.fromInputStream(fis, file.length())
        s3Client.putObject(request, requestBody)
        fis.close()
        return ReportFileCreationDto(requestId, "$ENDPOINT$BUCKET_NAME/$key", key)
    }

    fun putObject(file: InputStream, requestId: UUID, prefix: String, name: String): ReportFileCreationDto {
        val key = prefix + name.replace(" ", "_")
        val request = PutObjectRequest.builder().bucket(BUCKET_NAME).key(key).acl(ObjectCannedACL.PUBLIC_READ).build()
        val requestBody = RequestBody.fromInputStream(file, file.available().toLong())
        s3Client.putObject(request, requestBody)
        file.close()
        return ReportFileCreationDto(requestId, "$ENDPOINT$BUCKET_NAME/$key", key)
    }



}
