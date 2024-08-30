package com.PlanItRight.NotificationManagement.Controller;

import com.PlanItRight.NotificationManagement.Model.Notification;
import com.PlanItRight.NotificationManagement.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/sendEmail/eventId={eventId}/guestId={guestId}")
    public String sendEmail(@RequestBody Notification notification , @PathVariable Long guestId , @PathVariable Long eventId){

        notificationService.sendEmailToGuest(notification , guestId , eventId);
        return "Success";
    }
}
