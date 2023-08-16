package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/core-banking/transaction")
public class TransactionController {
  private final TransactionService transactionService;
  private final TransactionRepository transactionRepository;

  @Autowired
  public TransactionController(TransactionService transactionService, TransactionRepository transactionRepository) {
    this.transactionService = transactionService;
    this.transactionRepository = transactionRepository;
  }

  //create
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Transaction sendMoney(@RequestBody Transaction transaction) {
    return transactionService.sendMoney(transaction);
  }

  //get
  @GetMapping("/transactionHistory")
  @ResponseStatus(HttpStatus.OK)
  public List<Transaction> transactionHistory(@RequestParam(name = "accountId") String accountId, @RequestParam(name = "fromDate") Date fromDate, @RequestParam(name = "toDate") Date toDate) {
    return transactionRepository.findByDateCreatedBetweenAndFromAccountIdOrToAccountId(fromDate, toDate, accountId, accountId);
  }
}
