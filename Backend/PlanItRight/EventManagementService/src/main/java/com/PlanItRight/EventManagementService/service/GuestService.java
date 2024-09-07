package com.PlanItRight.EventManagementService.service;

import com.PlanItRight.EventManagementService.exception.DatabaseException;
import com.PlanItRight.EventManagementService.exception.ResourceNotFoundException;
import com.PlanItRight.EventManagementService.model.Event;
import com.PlanItRight.EventManagementService.model.Guest;
import com.PlanItRight.EventManagementService.repository.EventRepository;
import com.PlanItRight.EventManagementService.repository.GuestRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GuestRepository guestRepository;

    public Guest addGuestToEvent(Long eventId, Guest guest) throws ResourceNotFoundException, DatabaseException {
        try {
            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

//            event.getGuests().add(guest);
            Guest createdGuest = guestRepository.save(guest);
            createdGuest.setEventRef(eventId);
            guestRepository.save(createdGuest);
            eventRepository.save(event);
            return guest;

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("An error occurred while saving the guest to the event.", e);
        }
    }

    public void deleteGuestFromEvent(Long eventId, Long guestId) throws ResourceNotFoundException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with id: " + guestId));

        guestRepository.delete(guest);
    }

//    public List<Guest> getAllGuestsFromEvent(Long eventId) throws ResourceNotFoundException {
//        Event event = eventRepository.findById(eventId)
//                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));
//
//        return event.getGuests();
//    }

    public List<Guest> getAllGuestsFromEvent(Long eventId) throws ResourceNotFoundException{
        return guestRepository.findByEventRef(eventId);
    }

    public Guest updateRsvpStatus(Long eventId, String email, String rsvpStatus) throws ResourceNotFoundException {
        List<Guest> guestListByEventId = guestRepository.findByEventRef(eventId);
        Guest newGuest = null;
        for (Guest guest : guestListByEventId) {
            if (guest.getEmail().equals(email)) {
                guest.setRsvpStatus(rsvpStatus);
                guestRepository.save(guest);
                newGuest = guest;
            }
        }
        return newGuest;
    }

    public Guest updateRsvp(Long guestId, String rsvpStatus) throws ResourceNotFoundException {
        Optional<Guest> guestOptional = guestRepository.findById(guestId);

        if (guestOptional.isPresent()) {
            Guest guest = guestOptional.get();
            guest.setRsvpStatus(rsvpStatus);
            return guestRepository.save(guest);
        } else {
            throw new ResourceNotFoundException("Guest not found with id: " + guestId);
        }
    }




//    @Transactional
//    public Guest updateRsvpStatus(Long eventId, String email, String rsvpStatus) throws ResourceNotFoundException {
//        // Custom query to find the guest based on eventId and email
//        Query query = entityManager.createQuery("SELECT g FROM guest g WHERE g.event_id = :eventId AND g.email = :email");
//        query.setParameter("eventId", eventId);
//        query.setParameter("email", email);
//
//        Optional<Guest> optionalGuest = query.getResultStream().findFirst();
//
//        if (optionalGuest.isPresent()) {
//            Guest guest = optionalGuest.get();
//            guest.setRsvpStatus(rsvpStatus);
//            return guestRepository.save(guest);
//        } else {
//            throw new ResourceNotFoundException("Guest not found with email " + email + " for event with id " + eventId);
//        }
//    }

//    public String updateRsvpStatus(Long eventId, String email, String newStatus) {
//        GuestProjection guestProjection = guestRepository.findByEventIdAndEmail(eventId, email);
//
//        if (guestProjection != null && guestProjection.getEventId().equals(eventId)) {
//            // Fetch the full Guest entity and update the RSVP status (by email)
//            Guest guest = guestRepository.findByEmail(email);
//            guest.setRsvpStatus(newStatus);
//            guestRepository.save(guest);
//            return "RSVP status updated successfully to " + newStatus;
//        } else {
//            return "Invalid event ID for the provided email";
//        }
//    }
}

