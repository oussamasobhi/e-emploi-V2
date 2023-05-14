package com.example.eemploibackend.model;

import com.example.eemploibackend.model.audit.DateAudit;
import com.example.eemploibackend.token.Token;
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
     @OneToOne
      private FileDB image;
     private Date date_naissance;

     @ManyToMany
     @JoinTable(
             name = "competence_user",
             joinColumns = @JoinColumn(name = "prestataire_id"),
             inverseJoinColumns = @JoinColumn(name = "categorie_id"))
     List<Categorie_2_Annonce> competences;
     @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;
    @OneToMany(mappedBy = "reviewer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> given_reviews;
    @OneToOne
    private Adresse adresse;
    @OneToOne
    private Role role;
    @OneToMany(mappedBy = "user")
    private List<Token> tokens;
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<AnnonceUser> annonceUsers;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Annonce> annoncescrees;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        return id != null && id.equals(((User) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
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
