package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    List<Beneficiary> findBeneficiariesByPayerAccountId(Long payerAccountId);
}
