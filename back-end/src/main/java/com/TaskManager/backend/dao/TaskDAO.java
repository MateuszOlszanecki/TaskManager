package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.Task;

import java.util.List;

public interface TaskDAO {
    List<Task> findAll();
}
