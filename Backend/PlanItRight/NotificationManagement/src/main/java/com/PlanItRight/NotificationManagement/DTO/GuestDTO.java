package com.PlanItRight.NotificationManagement.DTO;

import lombok.Data;

@Data
public class GuestDTO {

    private Long id;

    private String name;
    private String email;
    private String rsvpStatus;
}
