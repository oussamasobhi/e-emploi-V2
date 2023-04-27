package com.example.eemploibackend.services;

import com.example.eemploibackend.model.FileDB;
import com.example.eemploibackend.model.User;
import com.example.eemploibackend.repository.FileDBRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final FileDBRepository fileDBRepository;
    //private final String FOLDER_PATH="C:\\Users\\oussa\\Desktop\\PFA\\e-emploi_project\\e-emploi-backend\\src\\main\\resources\\static";
//    private final String FOLDER_PATH = "D:\\DOCS\\ENSA\\CYCLE INGENIEUR\\PFA PROJET\\e-emploi_project\\e-emploi-backend\\src\\main\\resources\\static";
    //private final String FOLDER_PATH = "D:\\DOCS\\ENSA\\CYCLE INGENIEUR\\PFA PROJET\\e-emploi_project\\e-emploi-frontend\\src\\public\\files";
    private final String FOLDER_PATH="C:\\Users\\oussa\\Desktop\\PFA\\e-emploi_project\\e-emploi-backend\\src\\main\\files";
    public FileDB store(MultipartFile file) throws IOException {
        String timePrefix = String.valueOf(new Date().getTime());
        String filePath=FOLDER_PATH+"\\"+timePrefix+"_"+file.getOriginalFilename();
        FileDB fileDB= FileDB.builder()
                .name(timePrefix+"_"+file.getOriginalFilename())
                .type(file.getContentType())
                .filepath(filePath)
                .build();
         fileDBRepository.save(fileDB);
         file.transferTo(new File(filePath));
         if(fileDB!=null){
             return fileDB;
         }
         return null;
    }
    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileDB> fileData = fileDBRepository.findByName(fileName);
        String filePath=fileData.get().getFilepath();
        byte[] files = Files.readAllBytes(new File(filePath).toPath());
        return files;
    }

    public FileDB getFile(Long id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<FileDB> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}
