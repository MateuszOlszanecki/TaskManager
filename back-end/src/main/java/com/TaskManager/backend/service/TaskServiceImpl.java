package com.TaskManager.backend.service;

import com.TaskManager.backend.dao.TaskDAO;
import com.TaskManager.backend.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{
    private TaskDAO taskDAO;

    @Autowired
    public TaskServiceImpl(TaskDAO taskDAO) {
        this.taskDAO = taskDAO;
    }

    @Override
    public List<Task> findAll() {
        return taskDAO.findAll();
    }
}





