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

    @Column(name = "progress")
    private int progress;

    public Task() {}

    public Task(String description, int staff_member_id, int progress) {
        this.description = description;
        this.staff_member_id = staff_member_id;
        this.progress = progress;
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

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", staff_member_id=" + staff_member_id +
                ", progress=" + progress +
                '}';
    }
}
