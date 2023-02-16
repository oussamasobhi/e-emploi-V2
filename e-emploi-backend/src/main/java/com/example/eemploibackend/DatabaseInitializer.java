package com.example.eemploibackend;

import com.example.eemploibackend.model.Professionel;
import com.example.eemploibackend.model.Role;
import com.example.eemploibackend.model.RoleName;
import com.example.eemploibackend.repository.ProRepository;
import com.example.eemploibackend.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@AllArgsConstructor
@Order(1)
public class DatabaseInitializer implements ApplicationRunner {
    private final RoleRepository roleRepository;
    private final ProRepository proRepository;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        Role roleuser= Role.builder().name(RoleName.ROLE_USER).build();
        Role roleguest=Role.builder().name(RoleName.ROLE_GUEST).build();
           roleRepository.save(roleguest);
           roleRepository.save(roleuser);
    }
}
