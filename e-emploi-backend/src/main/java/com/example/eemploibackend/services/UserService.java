package com.example.eemploibackend.services;

import com.example.eemploibackend.auth.RegisterRequest;
import com.example.eemploibackend.exceptions.AppException;
import com.example.eemploibackend.model.*;
import com.example.eemploibackend.payloads.*;
import com.example.eemploibackend.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private  final FileDBRepository fileDBRepository;
    private final FileStorageService fileStorageService;
    private final Categorie_1_AnnonceRepository categorie1AnnonceRepository;
    private final AdresseRepository adresseRepository;
    public void updateuser(Pro_RegisterRequest request,Long iduser){

        Adresse adresse= new Adresse();
        if(request.getAdresse()!=null){
            adresse.setVille(request.getAdresse().getVille());
            adresse.setQuartier(request.getAdresse().getQuartier());
            adresse.setSuplementaire(request.getAdresse().getSuplementaire());
            adresseRepository.save(adresse);
        }


            userRepository.findById(iduser).map(
                USER ->
                {
                    if((userRepository.existsByEmail(request.getEmail()) && !request.getEmail().equals(request.getEmail())) ||
                            (userRepository.existsByUsername(request.getUsername())&& !request.getUsername().equals(request.getUsername()))){
                        return new ResponseEntity(new ApiResponse(false,
                                "username or email are already exist"), HttpStatus.BAD_REQUEST);
                    }
                    Boolean isafieldnull=false;
                         if(request.getNom()==null || request.getPrenom()==null ||
                            request.getUsername()==null|| request.getEmail()==null ||
                            request.getCIN()==null || request.getDate_naissance()==null||
                            request.getNum_tel()==null)
                             isafieldnull=true;
                             USER.setNom(request.getNom());
                             USER.setPrenom(request.getPrenom());
                             USER.setCIN(request.getCIN());
                             USER.setDate_naissance(request.getDate_naissance());
                             USER.setImage(request.getImage());
                             USER.setNum_tel(request.getNum_tel());
                             USER.setCompetences(request.getCompetences());
                    if(request.getAdresse()!=null){
                        USER.setAdresse(adresse);
                    }
             userRepository.save(USER);
                    return new ResponseEntity(new ApiResponse(true,
                            "utilisateur modifie bien modifié"), HttpStatus.ACCEPTED);
                }        );
    }

    public Boolean resetpassword(ResetPasswordRequest request,Long id){
        User user=userRepository.findUserById(id);
       if(passwordEncoder.matches(request.getOldpassword(), user.getPassword())){
           user.setPassword(passwordEncoder.encode(request.getNewpassword()));
           userRepository.save(user);
        return true;
       }
       return false;
    }
    public UserSummary mapusertoSummary(User user){
        UserSummary userSummary=new UserSummary();
        userSummary.setId(user.getId());
        userSummary.setAdresse(user.getAdresse());
        userSummary.setNom(user.getNom());
        userSummary.setEmail(user.getEmail());
        userSummary.setCIN(user.getCIN());
        userSummary.setUsername(user.getUsername());
        userSummary.setPrenom(user.getPrenom());
        userSummary.setNum_tel(user.getNum_tel());
        userSummary.setDate_naissance(user.getDate_naissance());
        userSummary.setPhoto_profil(user.getImage());
        userSummary.setRole(user.getRole().getName().name());
        userSummary.setStatus(user.getStatusUser());
    return userSummary;
    }
    public Boolean addprofilepic(User user, MultipartFile file) throws IOException {
        User concerneduser = userRepository.findUserById(user.getId());
        if(concerneduser==null)
            return false;
        FileDB storedfile = fileStorageService.store(file);
        if (file != null) {
            concerneduser.setImage(storedfile);
            userRepository.save(concerneduser);
        }
        else{
            return false;
        }
        return true;
    }
    // à changer selon l'emplacement ou voulez stocker vos images
  //  private final String FOLDER_PATH="C:\\Users\\oussa\\Desktop\\PFA\\e-emploi_project\\e-emploi-backend\\src\\main\\resources\\static";
    public void supprimerpic(String filename){
        FileDB fileDB= fileDBRepository.findByName(filename).orElseThrow();
        User user=fileDBRepository.findbyfilename(filename);
        user.setImage(null);
        userRepository.save(user);
        fileDBRepository.deleteById(fileDB.getId());
        File file=new File(fileDB.getFilepath());
        file.delete();
    }
    public FileDB getfilebyuserid(Long userid){
        return userRepository.getfilebyuserid(userid);
    }
    public List<UserResponse> getrandomusers(){
        List<User> users=userRepository.getallusersPRO();

        List<UserResponse> prorandomsresponse=new ArrayList<>();
        for(int i=0;i<2;i++){
            prorandomsresponse.add(ModelMapper.mapUserToUserResponse(users.get(i)));
        }
        return prorandomsresponse;
    }
    public List<UserResponse> getrandomsbycategory(Long idcategory){
        List<User> users=categorie1AnnonceRepository.getusersBysousCategory(idcategory);
        List<UserResponse> prorandomsresponse=new ArrayList<>();
        for(int i=0;i<2;i++){
            prorandomsresponse.add(ModelMapper.mapUserToUserResponse(users.get(i)));
        }
        return prorandomsresponse;
    }
    public UserSummary getUserById(Long id) throws Exception {
        User user = userRepository.findUserById(id);
        if(user!=null) return mapusertoSummary(user);
        else throw new Exception("something went wrong");
    }

    public User suspendreuser(Long id){
        User user=userRepository.findUserById(id);
        user.setStatusUser(StatusUser.Suspendu);
        userRepository.save(user);
        return user;
    }
    public User activeruser(Long id){
        User user=userRepository.findUserById(id);
        user.setStatusUser(StatusUser.Actif);
        userRepository.save(user);
        return user;
    }
    public List<Categorie_1_Annonce> getcompetences(Long id){
        if(!userRepository.existsById(id)){
            throw new EntityNotFoundException("user doesnt exist");
        }
        else{
            return userRepository.getcompetncesbyiduser(id);
        }
    }
}
