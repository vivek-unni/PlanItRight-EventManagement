package com.PlanItRight.VendorAndBudgetManagement.Feign;

import com.PlanItRight.VendorAndBudgetManagement.DTO.EventDTO;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "EventManagementService", url = "${event.service.url}")
public interface EventClient {

    @GetMapping("/api/events/{eventId}")
    EventDTO getEventById(@PathVariable Long eventId);
}