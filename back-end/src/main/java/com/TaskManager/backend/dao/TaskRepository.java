package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(path = "tasks")
@CrossOrigin(origins = "http://localhost:4200")
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
