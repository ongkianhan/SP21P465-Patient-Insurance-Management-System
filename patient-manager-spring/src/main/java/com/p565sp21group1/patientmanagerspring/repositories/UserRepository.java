package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.User;
import com.p565sp21group1.patientmanagerspring.payload.DoctorSearchRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long>
{
    @Query("SELECT u FROM User u " +
            "WHERE u.email = :email")
    User findByEmail(String email);

    @Query("SELECT d FROM Doctor d")
    Iterable<Doctor> getAllDoctors();

    @Query(value="SELECT d FROM Doctor d WHERE " +
            "(" +
                ":#{#filter.keywords} LIKE CONCAT('%', d.firstName, '%') " +
                "OR :#{#filter.keywords} LIKE CONCAT('%', d.lastName, '%') " +
                "OR :#{#filter.keywords} LIKE CONCAT('%', d.hospitalName, '%') " +
                "OR :#{#filter.keywords} LIKE CONCAT('%', d.specialization, '%')" +
            ") " +
            "AND (" +
                ":#{#filter.supportsCovidCare} = d.supportsCovidCare " +
                "OR :#{#filter.supportsCovidCare} = false" +
            ")")
    Iterable<Doctor> getDoctorsByFilter(DoctorSearchRequest filter);
}