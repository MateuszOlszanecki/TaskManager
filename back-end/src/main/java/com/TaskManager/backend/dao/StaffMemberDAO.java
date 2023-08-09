package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.StaffMember;

import java.util.List;

public interface StaffMemberDAO {
    List<StaffMember> findAll();
}
