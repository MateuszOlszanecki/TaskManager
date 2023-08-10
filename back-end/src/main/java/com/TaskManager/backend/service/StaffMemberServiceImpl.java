package com.TaskManager.backend.service;

import com.TaskManager.backend.dao.StaffMemberDAO;
import com.TaskManager.backend.entity.StaffMember;
import jakarta.transaction.Transactional;
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

    @Override
    public StaffMember findById(int id) {
        return staffMemberDAO.findById(id);
    }

    @Transactional
    @Override
    public StaffMember save(StaffMember staff_member) {
        return staffMemberDAO.save(staff_member);
    }

    @Transactional
    @Override
    public void deleteById(int id) {
        staffMemberDAO.deleteById(id);
    }
}





