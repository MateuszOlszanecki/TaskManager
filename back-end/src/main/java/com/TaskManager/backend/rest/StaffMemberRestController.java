package com.TaskManager.backend.rest;

import com.TaskManager.backend.entity.StaffMember;
import com.TaskManager.backend.service.StaffMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class StaffMemberRestController {
    private StaffMemberService staffMemberService;

    @Autowired
    public StaffMemberRestController(StaffMemberService staffMemberService) {
        this.staffMemberService = staffMemberService;
    }

    @GetMapping("/staff-list")
    public List<StaffMember> findAll() {
        return staffMemberService.findAll();
    }
}
