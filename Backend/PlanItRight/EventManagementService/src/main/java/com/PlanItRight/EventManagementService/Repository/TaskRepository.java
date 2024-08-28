package com.PlanItRight.EventManagementService.repository;

import com.PlanItRight.EventManagementService.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
}
