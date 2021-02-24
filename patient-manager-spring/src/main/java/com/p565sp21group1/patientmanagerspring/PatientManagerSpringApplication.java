package com.p565sp21group1.patientmanagerspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PatientManagerSpringApplication
{
	/*@Bean //TODO un-comment when Spring Security is added
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}*/

	public static void main(String[] args) {
		SpringApplication.run(PatientManagerSpringApplication.class, args);
	}
}
