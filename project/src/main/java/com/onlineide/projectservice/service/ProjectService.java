package com.onlineide.projectservice.service;

import com.onlineide.projectservice.dto.ErrorResponse;
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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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

    public ResponseEntity<?> createProject(String name) {

        // TODO: Add current user to project
        /*User currentUser = webClient.get()
                .uri("http://user-service/api/user/current")
                .retrieve()
                .bodyToMono(User.class)
                .block();*/

        // check if user exists in database, if not create a new one
        User currentUser = userRepository.findByUsername("test")
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .username("test")
                            .build();
                    userRepository.save(newUser);
                    return newUser;
                });
        try {
            Project project = Project.builder()
                    .name(name)
                    .users(Set.of(currentUser))
                    .build();
            log.info("creating project: {}", project.getName());
            userRepository.save(currentUser);
            projectRepository.save(project);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ProjectResponse.fromProject(project));
        } catch (DataIntegrityViolationException e) {
            log.info("project with name: {} already exists", name);
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("project with name: " + name + " already exists!"));
        } catch (Exception e) {
            log.info("error creating project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error creating project: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> getAllProjects() {
        try {
            List<Project> projects = projectRepository.findAll();
            log.info("get projects: {}", projects.stream()
                    .map(Project::getName)
                    .collect(Collectors.joining(", ")));
            return new ResponseEntity<>(ProjectResponse.fromProjects(projects), HttpStatus.OK);
        } catch (Exception e) {
            log.info("error getting projects: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error getting projects: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> getProjectById(String id) {
        try {
            Project project = projectRepository.findById(id).orElseThrow();
            log.info("get project: {} .", project.getName());
            return new ResponseEntity<>(ProjectResponse.fromProject(project), HttpStatus.OK);
        } catch (Exception e) {
            log.info("error getting project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error getting project: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> updateProjectName(String id, ProjectRequest projectRequest) {
        try {
            Project project = projectRepository.findById(id).orElseThrow();
            project.setName(projectRequest.getName());
            log.info("update project name: {}", project.getName());
            projectRepository.save(project);
            return new ResponseEntity<>(ProjectResponse.fromProject(project), HttpStatus.OK);
        } catch (Exception e) {
            log.info("error updating project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error updating project: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> deleteProject(String id) {
        try {
            Optional<Project> projectOptional = projectRepository.findById(id);
            if (projectOptional.isPresent()) {
                Project project = projectOptional.get();
                log.info("delete project: {}", project.getName());
                projectRepository.delete(project);
                return ResponseEntity.ok().build();
            } else {
                log.info("project with id: {} not found", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("project with id: " + id + " not found!"));
            }
        } catch (Exception e) {
            log.info("error deleting project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error deleting project: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> addUserToProject(String id, String username) {
        try {
            //TODO: Check if username exists in user-service
            Project project = projectRepository.findById(id).orElseThrow();
            project.getUsers().add(User.builder().username(username).build());
            log.info("add user: {} to project: {}", username, project.getName());
            projectRepository.save(project);
            return new ResponseEntity<>(ProjectResponse.fromProject(project), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            log.info("project with id: {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("project with id: " + id + " not found!"));
        } catch (Exception e) {
            log.info("error adding user to project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error adding user to project: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> addFileToProject(String id, String fileName) {
        try {
            Project project = projectRepository.findById(id).orElseThrow();
            File file = File.builder()
                    .name(fileName)
                    .project(project)
                    .build();
            project.getFiles().add(file);
            log.info("add file: {} to project: {}", fileName, project.getName());
            projectRepository.save(project);
            fileRepository.save(file);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(FileResponse.fromFile(file));
        } catch (NoSuchElementException e) {
            log.info("project with id: {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("project with id: " + id + " not found!"));
        } catch (Exception e) {
            log.info("error adding file to project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error adding file to project: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> getFilesFromProject(String id) {
        try {
            Project project = projectRepository.findById(id).orElseThrow();
            log.info("get files from project: {}", project.getName());
            return new ResponseEntity<>(FileResponse.fromFiles(project.getFiles()), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            log.info("project with id: {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("project with id: " + id + " not found!"));
        } catch (Exception e) {
            log.info("error getting files from project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("error getting files from project: " + e.getMessage()));
        }
    }
}
