package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.service.RecurringTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/recurring-transactions")
public class RecurringTransactionController {

    private final RecurringTransactionService recurringTransactionService;

    @Autowired
    public RecurringTransactionController(RecurringTransactionService recurringTransactionService) {
        this.recurringTransactionService = recurringTransactionService;
    }

    @GetMapping
    public List<RecurringTransaction> getAllRecurringTransactions() {
        return recurringTransactionService.getAllRecurringTransactions();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecurringTransaction createRecurringTransaction(@RequestParam Long accountId,
                                                           @RequestParam Double amount,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                           @RequestParam Frequency frequency) {
        return recurringTransactionService.createRecurringTransaction(accountId, amount, startDate, endDate, frequency);
    }
}
