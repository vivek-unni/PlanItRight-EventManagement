package com.PlanItRight.VendorAndBudgetManagement.service;



import com.PlanItRight.VendorAndBudgetManagement.DTO.EventDTO;
import com.PlanItRight.VendorAndBudgetManagement.Feign.EventClient;
import com.PlanItRight.VendorAndBudgetManagement.model.Budget;
import com.PlanItRight.VendorAndBudgetManagement.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private EventClient eventClient;

    public Budget setEventBudget(Long eventId, Budget budget) {

        EventDTO event = eventClient.getEventById(eventId);

        if (event != null) {
            budget.setEventId(event.getEventId());
            return budgetRepository.save(budget);
        }


        throw new IllegalArgumentException("Event with this ID " + eventId + " not found.");
    }

    public Optional<Budget> getBudgetByEventId(Long eventId) {
        return budgetRepository.findByEventId(eventId);
    }


}
