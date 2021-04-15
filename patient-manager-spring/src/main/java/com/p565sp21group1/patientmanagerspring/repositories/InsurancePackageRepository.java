package com.p565sp21group1.patientmanagerspring.repositories;
import com.p565sp21group1.patientmanagerspring.models.InsurancePackage;
import com.p565sp21group1.patientmanagerspring.payload.InsurancePackageSearchRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InsurancePackageRepository extends CrudRepository<InsurancePackage, Long>
{
    /**
     * Select every package created by the target insurer
     */
    @Query("SELECT i FROM InsurancePackage i " +
            "WHERE i.insurer.id = :insurerId ")
    List<InsurancePackage> getInsurancePackagesByInsurerId(long insurerId);

    /**
     * Select every package owned by the target patient
     */
    //Credit to https://stackoverflow.com/a/12110211 for the sub-query
    @Query("SELECT i from InsurancePackage i WHERE EXISTS " +
            "(SELECT u from InsurancePackage ie LEFT JOIN ie.patientsList u WHERE i = ie AND u.id = :patientId)")
    List<InsurancePackage> getInsurancePackagesByPatientId(long patientId);

    /**
     * Select every package in the target patient's recommendations
     */
    //Credit to https://stackoverflow.com/a/12110211 for the sub-query
    @Query("SELECT i from InsurancePackage i WHERE EXISTS " +
            "(SELECT u from InsurancePackage ie LEFT JOIN ie.recommendations u WHERE i = ie AND u.id = :patientId)")
    List<InsurancePackage> getRecommendedInsurancePackagesByPatientId(long patientId);

    @Query("SELECT i FROM InsurancePackage i WHERE" +
            /*Check for key words*/
            " i.firmName LIKE CONCAT('%', :#{#filter.keywords}, '%') " +
            /*Check for range of premium, deductible, copayment, coInsurance, and maximumOutOfPocket that user is willing to pay for*/
            "AND i.premium < :#{#filter.premiumMax} " +
            "AND i.deductible < :#{#filter.deductibleMax} " +
            "AND i.copayment < :#{#filter.copaymentMax} " +
            "AND i.coInsurance < :#{#filter.coInsuranceMax} " +
            "AND i.maximumOutOfPocket < :#{#filter.maximumOutOfPocketMax}") /*Check for key words*/
    Iterable<InsurancePackage> getInsurancePackagesByFilter(InsurancePackageSearchRequest filter);

}
