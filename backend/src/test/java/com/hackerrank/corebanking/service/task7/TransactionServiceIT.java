package com.hackerrank.corebanking.service.task7;

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
import java.util.Random;

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
        senderAccount.setBalance(50000.0);

        receiverAccount = new Account();
        secondReceiverAccount = new Account();

        senderAccount = accountRepository.save(senderAccount);
        receiverAccount = accountRepository.save(receiverAccount);
        secondReceiverAccount = accountRepository.save(secondReceiverAccount);

        authController.authenticateUser(senderAccount);
    }

    @Test
    void testSendMoneyFraudulentTransactionSameAmountMoreThan5Times() {
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(yesterdayDate);
        beneficiaryRepository.save(beneficiary);

        for (int i = 1; i <= 5; i++) {
            Transaction todayTransaction = createTransaction();
            todayTransaction.setTransferAmount(5000.0);
            transactionService.sendMoney(todayTransaction);
        }

        Transaction transaction = createTransaction();
        transaction.setTransferAmount(5000.0);

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionService.sendMoney(transaction));
        assertEquals("Transaction fraudulent", exception.getMessage());
    }

    @Test
    void testSendMoneyFraudulentTransactionSameAmountLessThan5Times() {
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(yesterdayDate);
        beneficiaryRepository.save(beneficiary);

        for (int i = 1; i <= 3; i++) {
            Transaction todayTransaction = createTransaction();
            todayTransaction.setTransferAmount(5000.0);
            transactionService.sendMoney(todayTransaction);
        }

        Transaction transaction = createTransaction();
        transaction.setTransferAmount(5000.0);

        assertDoesNotThrow(() -> transactionService.sendMoney(transaction), "Should be does not error");
    }

    @Test
    void testSendMoneyNotFraudulentTransactionRandomAmountMoreThan5Times() {
        Random random = new Random();
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(yesterdayDate);
        beneficiaryRepository.save(beneficiary);

        for (int i = 1; i <= 5; i++) {
            Transaction todayTransaction = createTransaction();
            todayTransaction.setTransferAmount(random.nextDouble(2000,6000));
            transactionService.sendMoney(todayTransaction);
        }

        Transaction transaction = createTransaction();
        transaction.setTransferAmount(5000.0);

        assertDoesNotThrow(() -> transactionService.sendMoney(transaction), "Should be does not error");
    }

    @Test
    void testSendMoneyFraudulentTransactionWithoutBeneficiaries() {
        Transaction transaction = createTransaction();

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionService.sendMoney(transaction));
        assertEquals("Transaction fraudulent", exception.getMessage());
    }

    @Test
    void testSendMoneyNotFraudulentTransactionTodayAddedBeneficiary() {
        Transaction transaction = createTransaction();

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiaryRepository.save(beneficiary);

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionService.sendMoney(transaction));
        assertEquals("Transaction fraudulent", exception.getMessage());
    }

    @Test
    void testSendMoneyFraudulentTransactionYesterdayAddedBeneficiary() {
        Date yesterdayDate = Date.from(LocalDate.now().minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        Transaction transaction = createTransaction();

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary = beneficiaryRepository.save(beneficiary);
        beneficiary.setDateCreated(yesterdayDate);
        beneficiaryRepository.save(beneficiary);

        assertDoesNotThrow(() -> transactionService.sendMoney(transaction), "Should be does not error");
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