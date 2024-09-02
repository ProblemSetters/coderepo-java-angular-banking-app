package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.service.RecurringTransactionService;
import com.hackerrank.corebanking.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/recurring-transactions")
public class RecurringTransactionController {

    private final RecurringTransactionService recurringTransactionService;
    private final AccountService accountService;

    @Autowired
    public RecurringTransactionController(RecurringTransactionService recurringTransactionService,
                                          AccountService accountService) {
        this.recurringTransactionService = recurringTransactionService;
        this.accountService = accountService;
    }

    @GetMapping
    public List<RecurringTransaction> getAllRecurringTransactions() {
        return recurringTransactionService.getAllRecurringTransactions();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecurringTransaction createRecurringTransaction(@RequestParam Long toAccountId,
                                                           @RequestParam Double amount,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                           @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                           @RequestParam Frequency frequency,
                                                           Principal principal) {
        String email = principal.getName();
        Account account = accountService.getAccountByEmailAddress(email);
        return recurringTransactionService.createRecurringTransaction(account.getAccountId(), toAccountId, amount, startDate, endDate, frequency);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleValidationException(IllegalArgumentException ex) {
        return ex.getMessage();
    }
}