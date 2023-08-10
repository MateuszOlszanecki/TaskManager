package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.StaffMember;

import java.util.List;

public interface StaffMemberDAO {
    List<StaffMember> findAll();
    StaffMember findById(int id);
    StaffMember save(StaffMember staff_member);
    void deleteById(int id);
}
