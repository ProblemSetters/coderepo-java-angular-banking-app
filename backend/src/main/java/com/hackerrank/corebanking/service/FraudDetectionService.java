package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.FraudMerchantRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;
    private final FraudMerchantRepository fraudMerchantRepository;
    private static final double TRANSACTION_LIMIT = 10000.0;
    private static final int MAX_RECENT_TRANSACTIONS = 5;
    private static final int ODD_HOUR_START = 1;
    private static final int ODD_HOUR_END = 4;

    @Autowired
    public FraudDetectionService(TransactionRepository transactionRepository, FraudMerchantRepository fraudMerchantRepository) {
        this.transactionRepository = transactionRepository;
        this.fraudMerchantRepository = fraudMerchantRepository;
    }

    public boolean isFrequentTransaction(Long accountId) {
        Date thirtyMinutesAgo = new Date(System.currentTimeMillis() - 20 * 60 * 1000);
        List<Transaction> recentTransactions = transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(accountId, thirtyMinutesAgo);
        return recentTransactions.size() > MAX_RECENT_TRANSACTIONS;
    }

    public boolean isOddHourTransaction(Date transactionDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(transactionDate);
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        return hour > ODD_HOUR_START && hour < ODD_HOUR_END;
    }

    public boolean exceedsTransactionLimit(double amount) {
        return amount < TRANSACTION_LIMIT;
    }

    public boolean isSuspiciousMerchant(Long accountNumber) {
        return fraudMerchantRepository.existsByAccountNumber(accountNumber);
    }

    public boolean isSuspiciousTransaction(Transaction transaction) {
        return isFrequentTransaction(transaction.getFromAccountId()) ||
                isOddHourTransaction(transaction.getDateCreated()) ||
                exceedsTransactionLimit(transaction.getTransferAmount()) ||
                isSuspiciousMerchant(transaction.getToAccountId());
    }
}