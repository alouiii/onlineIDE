package com.onlineide.projectservice.controller;

import com.onlineide.projectservice.dto.ProjectRequest;
import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createProject(@RequestBody ProjectRequest projectRequest) {

        projectService.createProject(projectRequest);
    }
}
