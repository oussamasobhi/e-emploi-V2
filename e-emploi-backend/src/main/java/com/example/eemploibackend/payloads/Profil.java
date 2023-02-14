package com.example.eemploibackend.payloads;

public class Profil {
    private Long id;
    private String username;
    private String name;
    private String test;
    public Profil(Long id, String username, String name) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
