package com.TaskManager.backend.dao;

import com.TaskManager.backend.entity.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "staff-list")
public interface StaffMemberRepository extends JpaRepository<StaffMember, Integer> {
}
