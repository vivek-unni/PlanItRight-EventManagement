package com.PlanItRight.EventManagementService.repository;

import com.PlanItRight.EventManagementService.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guest,Long> {

    Guest findByEmail(String email);
    List<Guest> findByEventRef(Long eventRef);
}
