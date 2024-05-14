package com.hackerrank.corebanking.service.task8;

import com.hackerrank.corebanking.controller.security.AuthController;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.BeneficiaryRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class TransactionServiceIT {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AuthController authController;

    private Transaction transaction;

    @BeforeEach
    void setup() {
        accountRepository.deleteAll();
        beneficiaryRepository.deleteAll();
        transactionRepository.deleteAll();

        Account senderAccount = new Account();
        senderAccount.setEmailAddress("test@gmail.com");
        senderAccount.setPassword("112233");
        senderAccount.setBalance(5000.0);

        Account receiverAccount = new Account();

        senderAccount = accountRepository.save(senderAccount);
        receiverAccount = accountRepository.save(receiverAccount);

        transaction = new Transaction();
        transaction.setTransactionId(1L);
        transaction.setFromAccountId(senderAccount.getAccountId());
        transaction.setToAccountId(receiverAccount.getAccountId());
        transaction.setDateCreated(new Date());
        transaction.setLastCreated(new Date());
        transaction.setTransferAmount(0.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiaryRepository.save(beneficiary);

        authController.authenticateUser(senderAccount);
    }

    @Test
    void testSendMoneyInsufficientFunds() {
        transaction.setTransferAmount(9000.0);

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionService.sendMoney(transaction), "The sending account must have a balance greater than or equal to the sending amount");
        assertEquals("Insufficient fund, transaction canceled", exception.getMessage());
    }

}
