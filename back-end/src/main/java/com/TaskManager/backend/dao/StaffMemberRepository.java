package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(path = "staff-list")
@CrossOrigin(origins = "http://localhost:4200")
public interface StaffMemberRepository extends JpaRepository<StaffMember, Integer> {
}
