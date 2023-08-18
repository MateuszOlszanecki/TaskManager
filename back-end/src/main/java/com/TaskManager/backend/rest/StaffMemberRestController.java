package com.TaskManager.backend.rest;

import com.TaskManager.backend.entity.StaffMember;
import com.TaskManager.backend.entity.Task;
import com.TaskManager.backend.service.StaffMemberService;
import com.TaskManager.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class StaffMemberRestController {
    private StaffMemberService staffMemberService;
    private TaskService taskService;

    @Autowired
    public StaffMemberRestController(StaffMemberService staffMemberService, TaskService taskService) {
        this.staffMemberService = staffMemberService;
        this.taskService = taskService;
    }

    @GetMapping("/staff-list")
    public List<StaffMember> findAll() {
        return staffMemberService.findAll();
    }

    @GetMapping("/staff-list/{id}")
    public StaffMember findById(@PathVariable int id) {
        return staffMemberService.findById(id);
    }

    @PostMapping("/staff-list")
    public int addStaffMember(@RequestBody StaffMember staff_member) {
        //id = 0, because when it is 0, then we create a new row with AUTO_INCREMENT id
        staff_member.setId(0);
        StaffMember db_staff_member = staffMemberService.save(staff_member);

        return db_staff_member.getId();
    }

    @PutMapping("/staff-list")
    public void updateStaffMember(@RequestBody StaffMember staff_member) {
        staffMemberService.save(staff_member);
    }

    @DeleteMapping("/staff-list/{id}")
    public void deleteStaffMember(@PathVariable int id) {
        List<Task> staff_member_tasks = taskService.findByStaffMemberId(id);
        for(Task task: staff_member_tasks) {
            taskService.deleteById(task.getId());
        }
        
        staffMemberService.deleteById(id);
    }
}
