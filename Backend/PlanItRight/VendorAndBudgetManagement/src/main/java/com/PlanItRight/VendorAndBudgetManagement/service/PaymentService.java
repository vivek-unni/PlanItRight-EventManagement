package com.PlanItRight.VendorAndBudgetManagement.service;


import com.PlanItRight.VendorAndBudgetManagement.model.Payment;
import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import com.PlanItRight.VendorAndBudgetManagement.repository.PaymentRepository;
import com.PlanItRight.VendorAndBudgetManagement.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public Payment createPayment(Payment payment, Long vendorId, Long eventId) {
        Optional<Vendor> vendorOptional = vendorRepository.findById(vendorId);
        if (vendorOptional.isPresent()) {
            payment.setVendor(vendorOptional.get());
            payment.setEventId(eventId);
            return paymentRepository.save(payment);
        } else {
            throw new IllegalArgumentException("Vendor with ID " + vendorId + " not found.");
        }
    }

    public List<Payment> getPaymentsByVendorIdAndEventId(Long vendorId, Long eventId) {
        return paymentRepository.findByVendorIdAndEventId(vendorId, eventId);
    }

    public List<Payment> getPaymentsByEventId(Long eventId) {
        return paymentRepository.findByEventId(eventId);
    }

    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Payment updatePayment(Long paymentId, Payment updatedPayment, Long vendorId, Long eventId) {
        Optional<Payment> existingPaymentOptional = paymentRepository.findById(paymentId);
        if (existingPaymentOptional.isPresent()) {
            Payment existingPayment = existingPaymentOptional.get();
            existingPayment.setAmount(updatedPayment.getAmount());
            existingPayment.setDueDate(updatedPayment.getDueDate());
            existingPayment.setStatus(updatedPayment.getStatus());
            existingPayment.setVendor(vendorRepository.findById(vendorId).orElseThrow(() -> new IllegalArgumentException("Vendor not found")));
            existingPayment.setEventId(eventId);
            return paymentRepository.save(existingPayment);
        } else {
            throw new IllegalArgumentException("Payment with ID " + paymentId + " not found.");
        }
    }

    public void deletePayment(Long paymentId) {
        if (paymentRepository.existsById(paymentId)) {
            paymentRepository.deleteById(paymentId);
        } else {
            throw new IllegalArgumentException("Payment with ID " + paymentId + " not found.");
        }
    }
}
