package com.onlineide.projectservice.service;

import com.onlineide.projectservice.dto.ProjectRequest;
import com.onlineide.projectservice.dto.ProjectResponse;
import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@Slf4j
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private WebClient webClient;

    public void createProject(ProjectRequest projectRequest) {

        // TODO: Check if username exists in user-service

        Project project = Project.builder()
                .name(projectRequest.getName())
                .userId(projectRequest.getUserId())
                .build();
        log.info("create project: {}", project);
        projectRepository.save(project);
    }

    public List<ProjectResponse> getAllProjects() {

            List<Project> projects = projectRepository.findAll();

            log.info("get projects: {}", projects);
            return ProjectResponse.fromProjects(projects);
    }

    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id).orElseThrow();
        log.info("get project: {}", project);
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .userId(project.getUserId())
                .build();
    }
}
