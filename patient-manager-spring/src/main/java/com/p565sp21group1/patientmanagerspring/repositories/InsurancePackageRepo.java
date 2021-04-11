package com.p565sp21group1.patientmanagerspring.repositories;
import com.p565sp21group1.patientmanagerspring.models.Doctor;
import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.payload.DoctorSearchRequest;
import com.p565sp21group1.patientmanagerspring.payload.InsurancePackageSearchRequest;
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

    @Query("SELECT i FROM InsurancePackage i WHERE" +
            /*Check for key words*/
            " i.firmName LIKE CONCAT('%', :#{#filter.keywords}, '%') AND "
             +
            /*Check for range of premium, deductible, copayment, coInsurance, and maximumOutOfPocket that user is willing to pay for*/
            "i.premium < :#{#filter.premiumMax} AND i.deductible < :#{#filter.deductibleMax}  AND i.copayment < :#{#filter.copaymentMax} AND i.coInsurance < :#{#filter.coInsuranceMax} " +
            "AND i.maximumOutOfPocket < :#{#filter.maximumOutOfPocketMax}") /*Check for key words*/
    Iterable<InsurancePackage> getInsurancePackagesByFilter(InsurancePackageSearchRequest filter);

}
