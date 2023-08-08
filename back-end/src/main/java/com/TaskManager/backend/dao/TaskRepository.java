package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "tasks")
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
