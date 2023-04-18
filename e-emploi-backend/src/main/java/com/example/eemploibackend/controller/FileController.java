package com.example.eemploibackend.controller;

import com.example.eemploibackend.config.CurrentUser;
import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.payloads.ResponseFile;
import com.example.eemploibackend.payloads.ResponseMessage;
import com.example.eemploibackend.repository.FileDBRepository;
import com.example.eemploibackend.services.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileStorageService fileStorageService;
    private final FileDBRepository fileDBRepository;
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        FileDB uploadImage=fileStorageService.store(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable(value = "filename") String filename) throws Exception
    {
        try
        {
            FileDB fileDB=fileDBRepository.findByName(filename).orElseThrow();
            byte[] Data=fileStorageService.downloadImageFromFileSystem(filename);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(fileDB.getType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                    .body(new ByteArrayResource(Data));
        }
        catch(Exception e)
        {
            throw new Exception("Error downloading file");
        }
    }
}
