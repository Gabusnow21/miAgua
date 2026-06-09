package dev.gabus.mi.agua.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String storeFile(MultipartFile file);
    // void deleteFile(String fileName); // To be implemented later if needed
}
