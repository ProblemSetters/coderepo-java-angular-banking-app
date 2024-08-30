package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.repository.RecurringTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class RecurringTransactionService {

    private final RecurringTransactionRepository recurringTransactionRepository;
    private final AccountService accountService;

    @Autowired
    public RecurringTransactionService(RecurringTransactionRepository recurringTransactionRepository,
                                       AccountService accountService) {
        this.recurringTransactionRepository = recurringTransactionRepository;
        this.accountService = accountService;
    }

    public RecurringTransaction createRecurringTransaction(Long accountId, Double amount, LocalDate startDate, LocalDate endDate, Frequency frequency) {
        Account account = accountService.getAccountByAccountId(accountId);

        RecurringTransaction recurringTransaction = RecurringTransaction.builder()
                .account(account)
                .amount(amount)
                .startDate(startDate.isBefore(LocalDate.now().plusDays(1)) ? LocalDate.now().plusDays(1) : startDate)
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
