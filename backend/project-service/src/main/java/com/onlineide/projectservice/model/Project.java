package com.onlineide.projectservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.core.SpringVersion;

@Entity
@Table(name = "project")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    // relation with user where the user can have many projects and each project can have multiple users
    private Long userId;
}
