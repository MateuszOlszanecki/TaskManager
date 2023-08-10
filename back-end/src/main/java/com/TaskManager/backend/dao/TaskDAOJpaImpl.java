package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.Task;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaskDAOJpaImpl implements TaskDAO{
    private EntityManager entityManager;

    @Autowired
    public TaskDAOJpaImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Task> findAll() {
        TypedQuery<Task> query = entityManager.createQuery("FROM Task", Task.class);
        List<Task> tasks = query.getResultList();
        return tasks;
    }

    @Override
    public Task findById(int id) {
        Task task = entityManager.find(Task.class, id);

        return task;
    }

    @Override
    public List<Task> findByStaffMemberId(int staff_member_id) {
        TypedQuery<Task> query = entityManager.createQuery("FROM Task WHERE staff_member_id = " + staff_member_id, Task.class);
        List<Task> tasks = query.getResultList();
        return tasks;
    }

    @Override
    public Task save(Task task) {
        Task db_task = entityManager.merge(task);
        return db_task;
    }

    @Override
    public void deleteById(int id) {
        Task task = entityManager.find(Task.class, id);
        entityManager.remove(task);
    }
}
