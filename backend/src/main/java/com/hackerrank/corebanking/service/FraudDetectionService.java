package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class FraudDetectionService {

    private final TransactionRepository transactionRepository;
    private static final double TRANSACTION_LIMIT = 10000.0;

    @Autowired
    public FraudDetectionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public boolean isFrequentTransaction(Long accountId) {
        Date thirtyMinutesAgo = new Date(System.currentTimeMillis() - 30 * 60 * 1000);
        List<Transaction> recentTransactions = transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(accountId, thirtyMinutesAgo);
        return recentTransactions.size() > 5;
    }

    public boolean isOddHourTransaction(Date transactionDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(transactionDate);
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        return hour >= 1 && hour < 4;
    }

    public boolean exceedsTransactionLimit(double amount) {
        return amount > TRANSACTION_LIMIT;
    }
}