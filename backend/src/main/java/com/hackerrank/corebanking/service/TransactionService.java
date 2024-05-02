package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
  private final TransactionRepository transactionRepository;
  private final AccountRepository accountRepository;

  @Autowired
  TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }


  public Transaction sendMoney(Transaction transaction) {
    Account fromAccount = accountRepository.findById(transaction.getFromAccountId()).get();
    Account toAccount = accountRepository.findById(transaction.getToAccountId()).get();

    // Basic Bugfix Balance Validation
    // Problem Statement:
    // 1. the sending account must have a balance greater than or equal to the sending amount.
    // 2. if balance is insufficient, transaction must be rejected and appropriate message to be returned.
    // 2. the return message should be "Insufficient fund, transaction canceled".


    //Identify fraudulent transactions in a list of transactions (populate the fraudulent transactions),
    /**
     * Mark a transaction fraudulent if:
     *    - the sender is sending same amount 5 times to same receiver within a day.
     *    - and the receiver is not in beneficiary list and has not sent any mount before.
     *    - if the receiver is in beneficiary list, then check if it was added just today.
     */
    fromAccount.setBalance(fromAccount.getBalance() - transaction.getTransferAmount());
    toAccount.setBalance(toAccount.getBalance() + transaction.getTransferAmount());

    accountRepository.save(fromAccount);
    accountRepository.save(toAccount);

    return transactionRepository.save(transaction);
  }

  public List<Transaction> totalTransactions(Long accountId) {
    return transactionRepository.findTransactionByFromAccountId(accountId);
  }
}
