package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/core-banking/transaction")
public class TransactionController {
  private final TransactionService transactionService;

  @Autowired
  public TransactionController(TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  //create
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Transaction sendMoney(@RequestBody Transaction transaction) {
    return transactionService.sendMoney(transaction);
  }
}
