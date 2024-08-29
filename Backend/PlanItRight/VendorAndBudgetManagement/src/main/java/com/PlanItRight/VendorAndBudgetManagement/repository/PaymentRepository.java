package com.PlanItRight.VendorAndBudgetManagement.repository;

import com.PlanItRight.VendorAndBudgetManagement.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByVendorIdAndEventId(Long vendorId, Long eventId);
    List<Payment> findByEventId(Long eventId);
}
