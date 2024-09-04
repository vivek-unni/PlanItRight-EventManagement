package com.example.planirright.service;

import com.example.planirright.model.AppUser;
import com.example.planirright.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean authenticate(String username, String password) {
        AppUser user = userRepository.findByUsername(username);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    public void registerUser(AppUser appUser) {
        if (userRepository.existsByUsername(appUser.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public AppUser getUserByUsername(String username) {
        AppUser appUser = userRepository.findByUsername(username);
        if (appUser != null) {
            return appUser;
        } else {
            throw new RuntimeException("User not found with username: " + username);
        }
    }
}
