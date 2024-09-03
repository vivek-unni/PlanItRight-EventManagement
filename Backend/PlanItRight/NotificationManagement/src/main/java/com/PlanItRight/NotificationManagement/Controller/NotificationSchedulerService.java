package com.PlanItRight.NotificationManagement.Controller;

import com.PlanItRight.NotificationManagement.DTO.EventDTO;
import com.PlanItRight.NotificationManagement.DTO.GuestDTO;
import com.PlanItRight.NotificationManagement.FeignClient.NotificationClient;
import com.PlanItRight.NotificationManagement.Model.Notification;
import com.PlanItRight.NotificationManagement.Service.NotificationService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificationSchedulerService {

    @Autowired
    private NotificationClient notificationClient;

    @Autowired
    private NotificationService notificationService;

    @PostConstruct
    public void init() {
        System.out.println("Starting notification scheduler...");
        startEventMonitor();
    }

    @Async
    public void startEventMonitor() {
        while (true) {
            checkAndSendNotifications();
            try {
                System.out.println("Checking notifications at " + LocalDateTime.now());
                Thread.sleep(60000); // Check every minute
            } catch (InterruptedException e) {
                System.err.println("Thread was interrupted: " + e.getMessage());
                Thread.currentThread().interrupt();
            }
        }
    }

    private void checkAndSendNotifications() {
        List<EventDTO> events = notificationClient.getAllEvents();
        System.out.println(events);
        LocalDateTime now = LocalDateTime.now();
        for (EventDTO event : events) {
            LocalDateTime eventDateTime = event.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().withHour(11).withMinute(0);

            if (ChronoUnit.HOURS.between(now, eventDateTime) <= 24) {
                System.out.println("Sending notifications for event: " + event.getEventId());
                sendNotificationsForEvent(event);
            }
        }
    }

    private void sendNotificationsForEvent(EventDTO event) {
        List<GuestDTO> guests = notificationClient.getAllGuestsFromEvent(event.getEventId());
        Notification notification = new Notification();
        notification.setMessage("Reminder for your event tomorrow at " + event.getDate());
        notification.setSubject("Event Reminder");

        for (GuestDTO guest : guests) {
            notificationService.sendEmailToGuest(notification, guest.getId(), event.getEventId());
        }
    }
}
