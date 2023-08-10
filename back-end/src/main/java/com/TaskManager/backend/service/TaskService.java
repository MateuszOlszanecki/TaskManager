package com.TaskManager.backend.service;

import com.TaskManager.backend.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> findAll();
    Task findById(int id);
    List<Task> findByStaffMemberId(int id);
    Task save(Task task);
    void deleteById(int id);
}
