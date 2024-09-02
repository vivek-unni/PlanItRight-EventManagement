package com.PlanItRight.EventManagementService.model;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long eventId;

    private String name;
    private String description;
    private Date date;
    private String location;
    private String type;
    private Long budget;


    @OneToMany
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<Task> tasks;

    @OneToMany
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<Guest> guests;
}
