package com.PlanItRight.VendorAndBudgetManagement.controller;

import com.PlanItRight.VendorAndBudgetManagement.model.Payment;
import com.PlanItRight.VendorAndBudgetManagement.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/vendors/{vendorId}/events/{eventId}")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment,
            @PathVariable Long vendorId,
            @PathVariable Long eventId) {
        Payment createdPayment = paymentService.createPayment(payment, vendorId, eventId);
        return ResponseEntity.ok(createdPayment);
    }

    @PutMapping("/{paymentId}/vendors/{vendorId}/events/{eventId}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long paymentId,
            @RequestBody Payment updatedPayment,
            @PathVariable Long vendorId,
            @PathVariable Long eventId) {
        Payment payment = paymentService.updatePayment(paymentId, updatedPayment, vendorId, eventId);
        return ResponseEntity.ok(payment);
    }

    @DeleteMapping("/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long paymentId) {
        paymentService.deletePayment(paymentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/vendors/{vendorId}/events/{eventId}")
    public ResponseEntity<List<Payment>> getPaymentsByVendorIdAndEventId(@PathVariable Long vendorId,
            @PathVariable Long eventId) {
        List<Payment> payments = paymentService.getPaymentsByVendorIdAndEventId(vendorId, eventId);
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/events/{eventId}")
    public ResponseEntity<List<Payment>> getPaymentsByEventId(@PathVariable Long eventId) {
        List<Payment> payments = paymentService.getPaymentsByEventId(eventId);
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long paymentId) {
        Optional<Payment> payment = paymentService.getPaymentById(paymentId);
        return payment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
