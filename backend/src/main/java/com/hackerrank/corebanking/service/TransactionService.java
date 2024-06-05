package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final BeneficiaryService beneficiaryService;

    @Autowired
    TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository, BeneficiaryService beneficiaryService) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.beneficiaryService = beneficiaryService;
    }


    public Transaction sendMoney(Transaction transaction) {
        Account fromAccount = accountRepository.findById(transaction.getFromAccountId()).get();
        Account toAccount = accountRepository.findById(transaction.getToAccountId()).get();

        Date todayDate = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Transaction> transactions = transactionRepository.findTransactionsByDateCreatedBetweenAndFromAccountIdOrToAccountId(yesterdayDate, todayDate,
                fromAccount.getAccountId().toString(), toAccount.getAccountId().toString());

        List<Transaction> todayTransactions = transactions.stream()
                .filter(t -> t.getToAccountId().equals(toAccount.getAccountId()))
                .filter(t -> t.getDateCreated().after(Date.from(new Date().toInstant().minus(1, ChronoUnit.DAYS))))
                .toList();

        transactions.removeAll(todayTransactions);

        List<Beneficiary> beneficiaries = beneficiaryService.getAllBeneficiaries();
        List<Beneficiary> todayBeneficiaries = beneficiaries.stream()
                .filter(b -> b.getBeneficiaryAccountId().equals(toAccount.getAccountId()))
                .filter(b -> b.getDateCreated().after(todayDate))
                .toList();

        if (todayTransactions.size() > 5 && beneficiaries.isEmpty() && transactions.isEmpty()
                || !todayBeneficiaries.isEmpty()) {
            throw new UnsupportedOperationException("Transaction fraudulent");
        }

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


    public Object getErrorMessage() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getErrorMessage'");
    }
}