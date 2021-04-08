package com.p565sp21group1.patientmanagerspring.repositories;
import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.services.InsurancePackageService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InsurancePackageRepo extends CrudRepository<InsurancePackage, Long> {

    @Query("SELECT i FROM InsurancePackage i WHERE i.insurancePackageID = :packageID" )
    List<InsurancePackage> getInsurancePackageByID(long packageID);

    @Query("SELECT i FROM InsurancePackage i")
    List<InsurancePackage> getAllInsurancePackages();


}
