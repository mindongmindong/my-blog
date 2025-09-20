package com.mindong.my_blog.domain;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@Table(name="users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String provider;

    private String email;

    public static User signUp(String name, String provider, String email) {
        return User.builder()
                .name(name)
                .provider(provider)
                .email(email)
                .build();
    }
}
