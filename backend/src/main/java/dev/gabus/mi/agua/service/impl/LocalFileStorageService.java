package dev.gabus.mi.agua.service.impl;

import dev.gabus.mi.agua.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    private final Path fileStorageLocation;

    public LocalFileStorageService(@Value("${file.upload-dir:./uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("No se pudo crear el directorio donde se guardarán los archivos.", ex);
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        try {
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("No se pudo almacenar el archivo " + fileName + ". Por favor, intenta de nuevo.", ex);
        }
    }
}

/*
// --- IMPLEMENTACIÓN PARA ORACLE CLOUD OBJECT STORAGE (COMENTADA) ---
// REQUIERE: Dependencia de Oracle Cloud SDK (oci-java-sdk-objectstorage)
//
// @Service
// public class OracleCloudFileStorageService implements FileStorageService {
//
//     private final ObjectStorageClient objectStorageClient;
//     private final String bucketName;
//
//     public OracleCloudFileStorageService(ObjectStorageClient objectStorageClient, 
//                                          @Value("${oci.bucket-name}") String bucketName) {
//         this.objectStorageClient = objectStorageClient;
//         this.bucketName = bucketName;
//     }
//
//     @Override
//     public String storeFile(MultipartFile file) {
//         String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//         try {
//             PutObjectRequest request = PutObjectRequest.builder()
//                     .bucketName(bucketName)
//                     .objectName(fileName)
//                     .putObjectBody(file.getInputStream())
//                     .contentLength(file.getSize())
//                     .build();
//
//             objectStorageClient.putObject(request);
//             return fileName;
//         } catch (IOException e) {
//             throw new RuntimeException("Error subiendo archivo a OCI", e);
//         }
//     }
// }
*/
