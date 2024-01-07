package com.onlineide.projectservice.service;

import com.onlineide.projectservice.dto.FileResponse;
import com.onlineide.projectservice.dto.ProjectRequest;
import com.onlineide.projectservice.dto.ProjectResponse;
import com.onlineide.projectservice.model.File;
import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.model.User;
import com.onlineide.projectservice.repository.FileRepository;
import com.onlineide.projectservice.repository.ProjectRepository;
import com.onlineide.projectservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private WebClient webClient;

    public ProjectResponse createProject(String name) {

        // TODO: Add current user to project
        /*User currentUser = webClient.get()
                .uri("http://user-service/api/user/current")
                .retrieve()
                .bodyToMono(User.class)
                .block();*/

        User currentUser = User.builder()
                .username("test")
                .build();

        Project project = Project.builder()
                .name(name)
                .users(Set.of(currentUser))
                .build();
        log.info("creating project: {}", project.getName());
        userRepository.save(currentUser);
        projectRepository.save(project);

        return ProjectResponse.fromProject(project);
    }

    public List<ProjectResponse> getAllProjects() {

            List<Project> projects = projectRepository.findAll();

            log.info("get projects: {}", projects.stream()
                    .map(Project::getName)
                    .collect(Collectors.joining(", ")));
            return ProjectResponse.fromProjects(projects);
    }

    public ProjectResponse getProjectById(String id) {

        Project project = projectRepository.findById(id).orElseThrow();
        log.info("get project: {}", project.getName());
        return ProjectResponse.fromProject(project);
    }

    public ProjectResponse updateProjectName(String id, ProjectRequest projectRequest) {

            Project project = projectRepository.findById(id).orElseThrow();
            project.setName(projectRequest.getName());
            log.info("update project name: {}", project.getName());
            projectRepository.save(project);

        return ProjectResponse.fromProject(project);
    }

    public void deleteProject(String id) {

                Project project = projectRepository.findById(id).orElseThrow();
                log.info("delete project: {}", project.getName());
                projectRepository.delete(project);
    }

    public ProjectResponse addUserToProject(String id, String username) {

            //TODO: Check if username exists in user-service

            Project project = projectRepository.findById(id).orElseThrow();
            project.getUsers().add(User.builder().username(username).build());
            log.info("add user: {} to project: {}", username, project.getName());
            projectRepository.save(project);

        return ProjectResponse.fromProject(project);
    }

    public FileResponse addFileToProject(String id, String fileName) {

                Project project = projectRepository.findById(id).orElseThrow();
                File file = File.builder()
                        .name(fileName)
                        .project(project)
                        .build();
                project.getFiles().add(file);
                log.info("add file: {} to project: {}", fileName, project.getName());
                projectRepository.save(project);
                fileRepository.save(file);

            return FileResponse.fromFile(file);
    }

    public List<FileResponse> getFilesFromProject(String id) {

                Project project = projectRepository.findById(id).orElseThrow();
                log.info("get files from project: {}", project.getName());
                return FileResponse.fromFiles(project.getFiles());
    }
}
