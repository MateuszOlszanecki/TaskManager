package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.StaffMember;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StaffMemberDAOJpaImpl implements StaffMemberDAO{
    private EntityManager entityManager;

    @Autowired
    public StaffMemberDAOJpaImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<StaffMember> findAll() {
        TypedQuery<StaffMember> query = entityManager.createQuery("FROM StaffMember", StaffMember.class);
        List<StaffMember> staff_list = query.getResultList();
        return staff_list;
    }
}
