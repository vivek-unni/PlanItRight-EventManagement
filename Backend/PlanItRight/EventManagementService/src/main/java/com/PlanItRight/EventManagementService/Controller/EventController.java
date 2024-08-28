package com.PlanItRight.EventManagementService.controller;


import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Task;
import com.PlanItRight.EventManagementService.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

   @GetMapping()
    public List<Event> getAllEvents()
   {
       return eventService.getAllEvents();
   }

   @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event event)
   {
       return eventService.addEvent(event);
   }

   @DeleteMapping("/deleteEvent/{id}")
    public void deleteEvent(@PathVariable Long id)
   {
        eventService.deleteEvent(id);
   }
    @PostMapping("/{eventId}/tasks")
    public Task addTaskToEvent(@PathVariable Long eventId, @RequestBody Task task) {
        Task createdTask = eventService.addTaskToEvent(eventId, task);
        return createdTask;
    }

}