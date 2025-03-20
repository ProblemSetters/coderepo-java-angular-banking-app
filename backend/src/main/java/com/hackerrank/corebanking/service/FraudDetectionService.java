package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;

    // Keep it required txn minus 1 as current txn is not saved when this check is being done
    private static final int MAX_RECENT_TRANSACTIONS = 2;
    private static final int FRAUD_TXN_RECENT_TIME_IN_MINUTES = 3;

    @Autowired
    public FraudDetectionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public boolean isFrequentTransaction(Long accountId) {
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(FRAUD_TXN_RECENT_TIME_IN_MINUTES);
        List<Transaction> recentTransactions = transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(accountId, fiveMinutesAgo);
        return recentTransactions.size() > MAX_RECENT_TRANSACTIONS;
    }

    public boolean isSuspiciousMerchant(Long accountNumber) {
        return String.valueOf(accountNumber).startsWith("9");
    }

    public boolean isSuspiciousTransaction(Transaction transaction) {
        return isFrequentTransaction(transaction.getFromAccountId()) || isSuspiciousMerchant(transaction.getToAccountId());
    }
}