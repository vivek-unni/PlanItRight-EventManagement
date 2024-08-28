package com.PlanItRight.EventManagementService.model;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Index;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Date dueDate;
    private String status;

//    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = "event_id", nullable = false)
//    @JoinColumn(name = "event_id", nullable = false)
//
//    private Event event;


}
