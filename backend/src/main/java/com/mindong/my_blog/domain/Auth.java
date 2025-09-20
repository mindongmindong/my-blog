package com.mindong.my_blog.domain;

public class Auth {

    private String token;

    private Auth(String token) {
        this.token = token;
    }

    public static Auth from(String token) {
        return new Auth(token);
    }

    public boolean validate() {
        return true;
    }
}
