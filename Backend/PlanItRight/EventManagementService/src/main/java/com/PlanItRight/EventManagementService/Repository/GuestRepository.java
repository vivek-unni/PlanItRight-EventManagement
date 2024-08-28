package com.PlanItRight.EventManagementService.repository;

import com.PlanItRight.EventManagementService.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestRepository extends JpaRepository<Guest,Long> {
}
