package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.FraudMerchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudMerchantRepository extends JpaRepository<FraudMerchant, Long> {
    boolean existsByAccountNumber(Long accountNumber);
}