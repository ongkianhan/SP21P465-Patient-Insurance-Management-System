package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.payload.DoctorSearchRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long>
{
    @Query("SELECT u FROM User u " +
            "WHERE u.email = :email")
    User findByEmail(String email);

    @Query("SELECT d FROM Doctor d")
    Iterable<Doctor> getAllDoctors();

    @Query("SELECT d FROM Doctor d " +
            "WHERE d.firstName LIKE '%'||filter.firstName||'%'")
    Iterable<Doctor> getDoctorsByFilter(DoctorSearchRequest filter);
}