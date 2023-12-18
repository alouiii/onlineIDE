package com.onlineide.projectservice.service;

import com.onlineide.projectservice.dto.ProjectRequest;
import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    public void createProject(ProjectRequest projectRequest) {

        Project project = Project.builder()
                .name(projectRequest.getName())
                .userId(projectRequest.getUserId())
                .build();

        projectRepository.save(project);
    }
}
