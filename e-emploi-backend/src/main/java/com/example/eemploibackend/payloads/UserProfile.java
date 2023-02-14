package com.example.eemploibackend.payloads;


public class UserProfile extends Profil {

 //   private String test="I AM A TASKER(USER)";

    public UserProfile(Long id, String username, String name) {
        super(id,username,name);
        this.setTest("IAM A TASKER");
    }

}
