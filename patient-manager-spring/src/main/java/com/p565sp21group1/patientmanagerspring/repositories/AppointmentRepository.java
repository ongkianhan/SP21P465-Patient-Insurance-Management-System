package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Appointment;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long>
{
    //Appointment findByProjectIdentifier(String identifier);

}

