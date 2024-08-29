package com.PlanItRight.VendorAndBudgetManagement.service;

import com.PlanItRight.VendorAndBudgetManagement.exception.EventNotFoundException;
import com.PlanItRight.VendorAndBudgetManagement.model.Vendor;
import com.PlanItRight.VendorAndBudgetManagement.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public Vendor addVendor(Vendor vendor) {
        vendor.setStatus("active");
        return vendorRepository.save(vendor);
    }

    public Vendor updateVendor(Long vendorId, Vendor updatedVendor) throws EventNotFoundException {
        if (vendorRepository.existsById(vendorId)) {
            updatedVendor.setId(vendorId);
            return vendorRepository.save(updatedVendor);
        } else {
            throw new EventNotFoundException("Vendor with ID " + vendorId + " not found.");
        }
    }

    public void deactivateVendor(Long vendorId) throws EventNotFoundException {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new EventNotFoundException("Vendor with ID " + vendorId + " not found."));
        vendor.setStatus("inactive");
        vendorRepository.save(vendor);
    }

    public Optional<Vendor> getVendorById(Long vendorId) throws EventNotFoundException {
        return Optional.ofNullable(vendorRepository.findById(vendorId)
                .orElseThrow(() -> new EventNotFoundException("Vendor with ID " + vendorId + " not found.")));
    }

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }
}
