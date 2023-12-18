package com.onlineide.projectservice.dto;

import com.onlineide.projectservice.model.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectResponse {

        private Long id;
        private String name;
        private Long userId;

    public static List<ProjectResponse> fromProjects(List<Project> projects) {

        return projects.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .userId(project.getUserId())
                        .build())
                .toList();
    }
}
