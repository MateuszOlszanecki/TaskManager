package com.TaskManager.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "description")
    private String description;

    @Column(name = "staff_member_id")
    private int staff_member_id;

    @Column(name = "status")
    private String status;

    @Column(name = "status_of_completion")
    private int status_of_completion;

    public Task() {}

    public Task(String description, int staff_member_id, String status, int status_of_completion) {
        this.description = description;
        this.staff_member_id = staff_member_id;
        this.status = status;
        this.status_of_completion = status_of_completion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStaff_member_id() {
        return staff_member_id;
    }

    public void setStaff_member_id(int staff_member_id) {
        this.staff_member_id = staff_member_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getStatus_of_completion() {
        return status_of_completion;
    }

    public void setStatus_of_completion(int status_of_completion) {
        this.status_of_completion = status_of_completion;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", staff_member_id='" + staff_member_id + '\'' +
                ", status='" + status + '\'' +
                ", status_of_completion='" + status_of_completion + '\'' +
                '}';
    }
}
