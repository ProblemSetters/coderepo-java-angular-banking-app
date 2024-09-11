package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    List<Beneficiary> findBeneficiariesByPayerAccountId(Long payerAccountId);
    
    @Query("SELECT b.beneficiaryAccountId FROM Beneficiary b")
    List<Long> findAllBeneficiaryAccountIds();
}
