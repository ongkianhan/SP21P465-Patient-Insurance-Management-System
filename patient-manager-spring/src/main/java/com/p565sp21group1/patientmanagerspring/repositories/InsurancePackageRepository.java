package com.p565sp21group1.patientmanagerspring.repositories;

import com.p565sp21group1.patientmanagerspring.models.Appointment;
import com.p565sp21group1.patientmanagerspring.models.Conversation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface InsurancePackageRepository extends JpaRepository<InsurancePackage, Long>
{


}
