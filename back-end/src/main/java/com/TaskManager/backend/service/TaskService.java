package com.TaskManager.backend.service;

import com.TaskManager.backend.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> findAll();
}
