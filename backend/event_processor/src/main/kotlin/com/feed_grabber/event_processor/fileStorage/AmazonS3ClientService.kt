package com.feed_grabber.event_processor.fileStorage


import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.mock.web.MockMultipartFile
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.ObjectCannedACL
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.io.File
import java.io.FileOutputStream
import java.time.LocalDateTime
import java.util.*


@Service
class AmazonS3ClientService(private val s3Client: S3Client) {

    @Value("\${amazon.bucketName}")
    private lateinit var BUCKET_NAME: String

    @Value("\${amazon.endpointUrl}")
    private lateinit var ENDPOINT: String

    fun uploadReport(resource: File): String {
        return putObject(resource, "reports/")
    }

    fun putObject(file: File, prefix: String): String {
        val key = prefix + LocalDateTime.now() + "-" + file.name?.replace(" ","_") ?: UUID.randomUUID().toString()
        val request = PutObjectRequest.builder().bucket(BUCKET_NAME).key(key).acl(ObjectCannedACL.PUBLIC_READ).build()
        val multiFile: MultipartFile = MockMultipartFile("report.xlsx", "report.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", file.readBytes())
        val requestBody = RequestBody.fromInputStream(multiFile.resource.inputStream, file.length())
      //  s3Client.putObject(request, requestBody)
        return "$ENDPOINT$BUCKET_NAME/$key"
    }

}