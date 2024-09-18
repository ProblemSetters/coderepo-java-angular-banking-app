package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.RecurringTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/core-banking/recurring-transactions")
public class RecurringTransactionController {

    @Autowired
    private RecurringTransactionService recurringTransactionService;

    @Autowired
    private AccountService accountService;

    @GetMapping
    public List<RecurringTransaction> getAllRecurringTransactions() {
        return recurringTransactionService.getAllRecurringTransactions();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecurringTransaction createRecurringTransaction(
            @RequestParam Long fromAccountId,
            @RequestParam Long toAccountId,
            @RequestParam Double amount,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam Frequency frequency) {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Account account = accountService.getAccountByEmailAddress(userDetails.getUsername());
        return recurringTransactionService.createRecurringTransaction(account, fromAccountId, toAccountId, amount, startDate, endDate, frequency);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleValidationException(IllegalArgumentException ex) {
        return ex.getMessage();
    }
}