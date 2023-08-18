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
    public int addTask(@RequestBody Task task) {
        //id = 0, because when it is 0, then we create a new row with AUTO_INCREMENT id
        task.setId(0);
        Task db_task = taskService.save(task);

        return db_task.getId();
    }

    @PutMapping("/tasks")
    public void updateTask(@RequestBody Task task) {
        taskService.save(task);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable int id) {
        taskService.deleteById(id);
    }
}
