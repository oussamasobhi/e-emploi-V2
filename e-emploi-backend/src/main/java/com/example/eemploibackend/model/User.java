package com.example.eemploibackend.model;

import com.example.eemploibackend.model.audit.DateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends DateAudit implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String prenom;
    private String nom;
    private String username;
    private String email;
    private String password;
    private String num_tel;
     private String CIN;
      private Byte[] photo_profil;
     private Date date_naissance;
     @ManyToMany(mappedBy = "prestataires")
        private List<OffreEmploi> offres;
     @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Adresse> adresses;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Competence> competences;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_societe")
    private Societe societe;
    @OneToOne
    private Role role;
    public User(Long id, String nom,String prenom, String username, String email, String password,Role role,String CIN) {
        super();
        this.id = id;
        this.nom = nom;
        this.prenom=prenom;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role=role;
        this.reviews=new HashSet<>();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities= List.of( new SimpleGrantedAuthority(this.getRole().getName().name()));
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
