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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
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

    private Account senderAccount;
    private Account receiverAccount;
    private Account secondReceiverAccount;

    @BeforeEach
    void setup() {
        accountRepository.deleteAll();
        beneficiaryRepository.deleteAll();
        transactionRepository.deleteAll();

        senderAccount = new Account();
        senderAccount.setEmailAddress("test@gmail.com");
        senderAccount.setPassword("112233");
        senderAccount.setBalance(5000.0);

        receiverAccount = new Account();
        receiverAccount.setBalance(0.0);

        secondReceiverAccount = new Account();

        senderAccount = accountRepository.save(senderAccount);
        receiverAccount = accountRepository.save(receiverAccount);
        secondReceiverAccount = accountRepository.save(secondReceiverAccount);

        authController.authenticateUser(senderAccount);
    }

    @Test
    void testSendMoneyInsufficientFunds() {
        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(9000.0);

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionService.sendMoney(transaction), "The sending account must have a balance greater than or equal to the sending amount");
        assertEquals("Insufficient fund, transaction canceled", exception.getMessage());
    }

    @Test
    void testSendMoneyEqualToSendingAmount() {
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(5000.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary = beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(yesterdayDate);
        beneficiaryRepository.save(beneficiary);

        assertDoesNotThrow(() -> {
            transactionService.sendMoney(transaction);
            senderAccount = accountRepository.findById(senderAccount.getAccountId()).get();
            receiverAccount = accountRepository.findById(receiverAccount.getAccountId()).get();
            assertEquals(0, senderAccount.getBalance());
            assertEquals(5000, receiverAccount.getBalance());
        }, "Should be does not error");
    }

    @Test
    void testSendMoneyBalanceGreaterThanSendingAmount() {
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(3000.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary = beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(yesterdayDate);
        beneficiaryRepository.save(beneficiary);

        assertDoesNotThrow(() -> {
            transactionService.sendMoney(transaction);
            senderAccount = accountRepository.findById(senderAccount.getAccountId()).get();
            receiverAccount = accountRepository.findById(receiverAccount.getAccountId()).get();
            assertEquals(2000, senderAccount.getBalance());
            assertEquals(3000, receiverAccount.getBalance());
        }, "Should be does not error");
    }

    private Transaction createTransaction() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(senderAccount.getAccountId());
        transaction.setToAccountId(receiverAccount.getAccountId());
        transaction.setDateCreated(new Date());
        transaction.setLastCreated(new Date());
        transaction.setTransferAmount(0.0);
        return transaction;
    }

}
