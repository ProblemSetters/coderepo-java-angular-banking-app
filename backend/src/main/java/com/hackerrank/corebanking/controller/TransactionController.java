package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.BeneficiaryService;
import com.hackerrank.corebanking.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/core-banking/transaction")
public class TransactionController {
    private final TransactionService transactionService;
    private final AccountService accountService;
    private final TransactionRepository transactionRepository;
    private final BeneficiaryService beneficiaryService;

    @Autowired
    public TransactionController(TransactionService transactionService, AccountService accountService, TransactionRepository transactionRepository, BeneficiaryService beneficiaryService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
        this.transactionRepository = transactionRepository;
        this.beneficiaryService = beneficiaryService;
    }

    //create
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transaction sendMoney(@RequestBody Transaction transaction) {
        /**
         * TODO: Validate that the transaction passes following rules
         * 1. Sender cannot send more than 5000 at once to newly added beneficiary
         * 2. To send more than 5000 to a beneficiary, beneficiary add date should be at least 5 days back.
         * 3. If the receiver is not in beneficiary list of sender, then no restriction on the send amount.
         */
        List<Beneficiary> allBeneficiaries = beneficiaryService.getAllBeneficiaries();
        for (Beneficiary beneficiary : allBeneficiaries) {
            long diffInMill = Math.abs(beneficiary.getDateCreated().getTime() - transaction.getDateCreated().getTime());
            long diff = TimeUnit.MINUTES.convert(diffInMill, TimeUnit.MILLISECONDS);
            if (diff < 5 &&
                    transaction.getTransferAmount() >= 5000
                    && beneficiary.getBeneficiaryAccountId().equals(transaction.getToAccountId())) {
                throw new UnsupportedOperationException("To send more than 5000 to a new beneficiary, beneficiary add date should be at least 5 minutes back");
            }
        }
        Account toAccount = accountService.getAccountByAccountId(transaction.getToAccountId());
        if (toAccount != null) {
            return transactionService.sendMoney(transaction);
        } else {
            return null;
        }
    }

    //get
    @GetMapping("/transactionHistory")
    @ResponseStatus(HttpStatus.OK)
    public List<Transaction> transactionHistory(@RequestParam(name = "accountId") String accountId, @DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam(name = "fromDate") Date fromDate, @DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam(name = "toDate") Date toDate) {
        //this is need to support time stamp
        toDate.setHours(23);
        toDate.setMinutes(60);
        toDate.setSeconds(00);
        return transactionRepository.findTransactionsByDateCreatedBetweenAndFromAccountIdOrToAccountId(fromDate, toDate, accountId, accountId);
    }

    public Object getErrorMessage() {
        throw new UnsupportedOperationException("Unimplemented method 'getErrorMessage'");
    }
}