package com.onlineide.projectservice.controller;

import com.onlineide.projectservice.dto.ProjectRequest;
import com.onlineide.projectservice.dto.ProjectResponse;
import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createProject(@RequestBody Map<String, String> projectRequest) {

        projectService.createProject(projectRequest.get("name"));
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<ProjectResponse> getAllProjects() {

        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ProjectResponse getProjectById(@PathVariable String id) {

        return projectService.getProjectById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public void updateProject(@PathVariable String id, @RequestBody ProjectRequest projectRequest) {

        projectService.updateProject(id, projectRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteProject(@PathVariable String id) {

        projectService.deleteProject(id);
    }
}
