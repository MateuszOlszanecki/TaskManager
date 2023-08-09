package com.TaskManager.backend.service;

import com.TaskManager.backend.dao.StaffMemberDAO;
import com.TaskManager.backend.entity.StaffMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffMemberServiceImpl implements StaffMemberService{
    private StaffMemberDAO staffMemberDAO;

    @Autowired
    public StaffMemberServiceImpl(StaffMemberDAO staffMemberDAO) {
        this.staffMemberDAO = staffMemberDAO;
    }

    @Override
    public List<StaffMember> findAll() {
        return staffMemberDAO.findAll();
    }
}





