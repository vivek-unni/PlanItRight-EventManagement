package com.PlanItRight.NotificationManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class NotificationManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationManagementApplication.class, args);
	}

}
