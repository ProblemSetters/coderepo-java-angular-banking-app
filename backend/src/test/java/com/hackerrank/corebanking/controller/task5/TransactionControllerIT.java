package com.hackerrank.corebanking.controller.task5;

import com.hackerrank.corebanking.controller.TransactionController;
import com.hackerrank.corebanking.controller.security.AuthController;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.BeneficiaryRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class TransactionControllerIT {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AuthController authController;

    @Autowired
    private TransactionController transactionController;

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
        senderAccount.setBalance(50000.0);

        receiverAccount = new Account();
        secondReceiverAccount = new Account();

        senderAccount = accountRepository.save(senderAccount);
        receiverAccount = accountRepository.save(receiverAccount);
        secondReceiverAccount = accountRepository.save(secondReceiverAccount);

        authController.authenticateUser(senderAccount);
    }

    @Test
    void testSendMoneyWithoutBeneficiaryMoreThan5000() {
        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(6000.0);
        transaction.setToAccountId(secondReceiverAccount.getAccountId());

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionController.sendMoney(transaction), "To send more than 5000, a beneficiary needs to be added.");
        assertEquals("To send more than 5000, a beneficiary needs to be added", exception.getMessage());
    }

    @Test
    void testSendMoneyWithoutBeneficiaryLessThan5000() {
        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(4000.0);
        transaction.setToAccountId(secondReceiverAccount.getAccountId());

        Transaction result = transactionController.sendMoney(transaction);

        assertTrue(5000 >= result.getTransferAmount(), "Transaction amount more than 5000");
        assertDoesNotThrow(() -> transactionController.sendMoney(transaction), "Should be does not error");
    }

    @Test
    void testSendMoneyWithNewBeneficiaryBeforeFiveMinutesMoreThan5000() {
        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(6000.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiaryRepository.save(beneficiary);

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionController.sendMoney(transaction), "To send more than 5000 to a new beneficiary, beneficiary add date should be at least 5 minutes back");
        assertEquals("To send more than 5000 to a new beneficiary, beneficiary add date should be at least 5 minutes back", exception.getMessage());
    }

    @Test
    void testSendMoneyWithNewBeneficiaryBeforeFiveMinutesLessThan5000() {
        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(4000.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary = beneficiaryRepository.save(beneficiary);

        Transaction result = transactionController.sendMoney(transaction);

        long diffInMill = Math.abs(beneficiary.getDateCreated().getTime() - result.getDateCreated().getTime());
        long diff = TimeUnit.MINUTES.convert(diffInMill, TimeUnit.MILLISECONDS);

        assertTrue(diff <= 5, "More than 5 minutes back");
        assertTrue(5000 >= result.getTransferAmount(), "Transaction amount more than 5000");
        assertDoesNotThrow(() -> transactionController.sendMoney(transaction), "Should be does not error");
    }

    @Test
    void testSendMoneyWithNewBeneficiaryAfterFiveMinutesMoreThan5000() {
        Date fiveMinutesAgo = Date.from(Instant.now().minus(6, ChronoUnit.MINUTES));

        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(6000.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary = beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(fiveMinutesAgo);
        beneficiaryRepository.save(beneficiary);

        Transaction result = transactionController.sendMoney(transaction);

        long diffInMill = Math.abs(beneficiary.getDateCreated().getTime() - result.getDateCreated().getTime());
        long diff = TimeUnit.MINUTES.convert(diffInMill, TimeUnit.MILLISECONDS);

        assertTrue(diff >= 5, "Less than 5 minutes back");
        assertTrue(5000 <= result.getTransferAmount(), "Transaction amount less than 5000");
        assertDoesNotThrow(() -> transactionController.sendMoney(transaction), "Should be does not error");
    }

    @Test
    void testSendMoneyWithNewBeneficiaryAfterFiveMinutesLessThan5000() {
        Date fiveMinutesAgo = Date.from(Instant.now().minus(6, ChronoUnit.MINUTES));

        Transaction transaction = transactionRepository.save(createTransaction());
        transaction.setTransferAmount(4000.0);

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary = beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(fiveMinutesAgo);
        beneficiaryRepository.save(beneficiary);

        Transaction result = transactionController.sendMoney(transaction);

        long diffInMill = Math.abs(beneficiary.getDateCreated().getTime() - result.getDateCreated().getTime());
        long diff = TimeUnit.MINUTES.convert(diffInMill, TimeUnit.MILLISECONDS);

        assertTrue(diff >= 5, "Less than 5 minutes back");
        assertTrue(5000 >= result.getTransferAmount(), "Transaction amount more than 5000");
        assertDoesNotThrow(() -> transactionController.sendMoney(transaction), "Should be does not error");
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
