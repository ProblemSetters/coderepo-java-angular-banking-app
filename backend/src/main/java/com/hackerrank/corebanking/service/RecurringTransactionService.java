package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.repository.RecurringTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RecurringTransactionService {

    @Autowired
    private RecurringTransactionRepository recurringTransactionRepository;

    public RecurringTransaction createRecurringTransaction(
            Account account, Long fromAccountId, Long toAccountId,
            Double amount, LocalDate startDate, LocalDate endDate,
            Frequency frequency) {

        if (startDate.isBefore(LocalDate.now().plusDays(1))) {
            throw new IllegalArgumentException("Start date must be at least one day in the future.");
        }

        RecurringTransaction recurringTransaction = RecurringTransaction.builder()
                .account(account)
                .fromAccountId(fromAccountId)
                .toAccountId(toAccountId)
                .amount(amount)
                .startDate(startDate)
                .endDate(endDate)
                .frequency(frequency)
                .build();

        return recurringTransactionRepository.save(recurringTransaction);
    }

    public List<RecurringTransaction> getDueRecurringTransactions(LocalDate today) {
        return recurringTransactionRepository.findByStartDateBeforeAndEndDateAfter(today, today);
    }

    public LocalDate calculateNextExecutionDate(LocalDate currentExecutionDate, Frequency frequency) {
        switch (frequency) {
            case DAILY:
                return currentExecutionDate.plusDays(1);
            case WEEKLY:
                return currentExecutionDate.plusWeeks(1);
            case MONTHLY:
                return currentExecutionDate.plusMonths(1);
            default:
                throw new IllegalArgumentException("Unsupported frequency: " + frequency);
        }
    }

    public List<RecurringTransaction> getAllRecurringTransactions() {
        return recurringTransactionRepository.findAll();
    }
}