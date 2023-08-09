package com.TaskManager.backend.service;

import com.TaskManager.backend.entity.StaffMember;

import java.util.List;

public interface StaffMemberService {
    List<StaffMember> findAll();
}
