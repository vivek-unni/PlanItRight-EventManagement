package com.PlanItRight.VendorAndBudgetManagement.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private Long eventId;
    private String name;
    private String description;
    private Date date;
    private String location;
    private String type;
}

