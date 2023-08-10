package com.TaskManager.backend.rest;

import com.TaskManager.backend.entity.Task;
import com.TaskManager.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class TaskRestController {
    private TaskService taskService;

    @Autowired
    public TaskRestController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> findAll() {
        return taskService.findAll();
    }

    @GetMapping("/tasks/{id}")
    public Task findById(@PathVariable int id) {
        return taskService.findById(id);
    }

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task task) {
        //id = 0, because when it is 0, then we create a new row with AUTO_INCREMENT id
        task.setId(0);
        Task db_task = taskService.save(task);

        return db_task;
    }

    @PutMapping("/tasks")
    public Task updateTask(@RequestBody Task task) {
        Task db_task = taskService.save(task);

        return db_task;
    }

    @DeleteMapping("/tasks/{id}")
    public String deleteTask(@PathVariable int id) {
        Task task = taskService.findById(id);

        if(task == null) {
            throw new RuntimeException("Task not found - id: " + id);
        }

        taskService.deleteById(id);

        return "Deleted task - id: " + id;
    }
}
