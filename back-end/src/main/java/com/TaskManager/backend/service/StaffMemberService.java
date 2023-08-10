package com.TaskManager.backend.service;

import com.TaskManager.backend.entity.StaffMember;

import java.util.List;

public interface StaffMemberService {
    List<StaffMember> findAll();
    StaffMember findById(int id);
    StaffMember save(StaffMember staff_member);
    void deleteById(int id);
}
