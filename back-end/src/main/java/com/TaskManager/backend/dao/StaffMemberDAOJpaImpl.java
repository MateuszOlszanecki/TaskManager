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

    @Override
    public StaffMember findById(int id) {
        StaffMember staff_member = entityManager.find(StaffMember.class, id);

        return staff_member;
    }

    @Override
    public StaffMember save(StaffMember staff_member) {
        StaffMember db_staff_member = entityManager.merge(staff_member);
        return db_staff_member;
    }

    @Override
    public void deleteById(int id) {
        StaffMember staff_member = entityManager.find(StaffMember.class, id);
        entityManager.remove(staff_member);
    }
}
