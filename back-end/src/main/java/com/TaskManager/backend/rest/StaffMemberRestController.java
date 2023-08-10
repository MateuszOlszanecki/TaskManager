package com.TaskManager.backend.rest;

import com.TaskManager.backend.entity.StaffMember;
import com.TaskManager.backend.service.StaffMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/staff-list")
    public StaffMember addStaffMember(@RequestBody StaffMember staff_member) {
        //id = 0, because when it is 0, then we create a new row with AUTO_INCREMENT id
        staff_member.setId(0);
        StaffMember db_staff_member = staffMemberService.save(staff_member);

        return db_staff_member;
    }

    @PutMapping("/staff-list")
    public StaffMember updateStaffMember(@RequestBody StaffMember staff_member) {
        StaffMember db_staff_member = staffMemberService.save(staff_member);

        return db_staff_member;
    }

    @DeleteMapping("/staff-list/{id}")
    public String deleteStaffMember(@PathVariable int id) {
        StaffMember staff_member = staffMemberService.findById(id);

        if(staff_member == null) {
            throw new RuntimeException("Staff member not found - id: " + id);
        }

        staffMemberService.deleteById(id);

        return "Deleted staff member - id: " + id;
    }
}
