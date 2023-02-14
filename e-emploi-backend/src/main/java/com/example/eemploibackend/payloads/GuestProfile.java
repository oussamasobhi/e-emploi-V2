package com.example.eemploibackend.payloads;

public class GuestProfile extends Profil {


    public GuestProfile(Long id, String username, String name) {
        super(id,username,name);
        this.setTest("I AM A GUEST");
    }


}
