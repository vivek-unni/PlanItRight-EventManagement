package com.PlanItRight.EventManagementService.service;


import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Task;
import com.PlanItRight.EventManagementService.repository.EventRepository;
import com.PlanItRight.EventManagementService.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
     private TaskRepository taskRepository;

    @Autowired
    private EventRepository eventRepository;

    public Task addTaskToEvent(Long eventId, Task task) throws ResourceNotFoundException, DatabaseException {
        try {
            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));


            event.getTasks().add(task);
            taskRepository.save(task);
            eventRepository.save(event);
            return task;

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("An error occurred while saving the task to the event.", e);
        }
    }



    public void deleteTaskFromEvent(Long eventId, Long taskId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));


        taskRepository.delete(task);
    }

//    public List<Task> getAllTasksFromEvent( Long id)
//    {
//        Optional<Event> optionalEvent = eventRepository.findById(id);
//        if (optionalEvent.isPresent()) {
//            Event event = optionalEvent.get();
//            return event.getTasks();
//        }
//        return null;
//
//    }

    public List<Task> getAllTasksFromEvent(Long eventId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        return event.getTasks();
    }

}
