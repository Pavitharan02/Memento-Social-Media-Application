package com.personal.social_media_application.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class ImageUploadController {

    @Value("${upload.directory}")
    private String uploadDirectory;

    @PostMapping("/to")
    public ResponseEntity<String> uploadImage(@RequestPart("image") MultipartFile image) {
        try {
            // Generate a unique filename for the uploaded image
            String filename = generateUniqueFilename(image.getOriginalFilename());

            // Create the directory if it doesn't exist
            File directory = new File(uploadDirectory);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the image file
            Path filePath = Path.of(uploadDirectory, filename);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Build the image URL to return
            String imageUrl = "/" + filename;

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    private String generateUniqueFilename(String originalFilename) {
        String extension = StringUtils.getFilenameExtension(originalFilename);
        return UUID.randomUUID().toString() + "." + extension;
    }
}
