package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Transaction;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FraudDetectionService {

    public Boolean isFrequentTransaction(Long accountId) {
        return null;
    }

    public Boolean isSuspiciousMerchant(Long accountNumber) {
        return null;
    }

    public Boolean isSuspiciousTransaction(Transaction transaction) {
        return null;
    }
}