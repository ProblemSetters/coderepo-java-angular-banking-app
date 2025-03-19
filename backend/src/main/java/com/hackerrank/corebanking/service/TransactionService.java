package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Card;
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
    private final CardService cardService;
    private final FraudDetectionService fraudDetectionService;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository, CardService cardService, FraudDetectionService fraudDetectionService) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.cardService = cardService;
        this.fraudDetectionService = fraudDetectionService;
    }

    public Transaction sendMoney(Transaction transaction) {
        Account fromAccount = accountRepository.findById(transaction.getFromAccountId()).get();
        Account toAccount = accountRepository.findById(transaction.getToAccountId()).get();

        fromAccount.setBalance(fromAccount.getBalance() + transaction.getTransferAmount());
        toAccount.setBalance(toAccount.getBalance() - transaction.getTransferAmount());
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        return transactionRepository.save(transaction);
    }

    public List<Transaction> totalTransactions(Long accountId) {
        return transactionRepository.findTransactionByFromAccountId(accountId);
    }

    public Object getErrorMessage() {
        throw new UnsupportedOperationException("Unimplemented method 'getErrorMessage'");
    }
}