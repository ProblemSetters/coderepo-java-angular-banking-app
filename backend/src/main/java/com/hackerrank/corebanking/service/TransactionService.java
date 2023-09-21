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

    //TODO: Balance validation
    /**
     * 1. sending account must have balance greater then or equal to send amount.
     * 2. if balance is insufficient, transaction must be rejected and appropriate message to be returned.
     * 2. return message should be "Insufficient fund, transaction canceled".
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
