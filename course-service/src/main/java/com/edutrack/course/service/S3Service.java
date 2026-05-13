package com.edutrack.course.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.region}")
    private String region;

    public String uploadFile(MultipartFile file) {
        String key = "covers/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));

            String url = String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, key);
            log.info("Archivo subido a S3: {}", url);
            return url;

        } catch (Exception e) {
            log.error("Error al subir archivo a S3: {}", e.getMessage(), e);
            throw new RuntimeException("Error al subir archivo a S3: " + e.getMessage());
        }
    }

    public void deleteFile(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return;
        try {
            String key = imageUrl.substring(imageUrl.indexOf("covers/"));
            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .build());
            log.info("Archivo eliminado de S3: {}", key);
        } catch (Exception e) {
            log.warn("No se pudo eliminar el archivo de S3: {}", e.getMessage());
        }
    }
}