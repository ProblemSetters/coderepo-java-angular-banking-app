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

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

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

    private Transaction transaction;

    @BeforeEach
    void setup() {
        accountRepository.deleteAll();
        beneficiaryRepository.deleteAll();
        transactionRepository.deleteAll();

        Account senderAccount = new Account();
        senderAccount.setEmailAddress("test@gmail.com");
        senderAccount.setPassword("112233");
        senderAccount.setBalance(50000.0);

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
    void testSendMoneyWithBeneficiaryBeforeFiveDayMoreThan5000() {
        transaction.setTransferAmount(6000.0);

        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> transactionController.sendMoney(transaction), "To send more than 5000 to a beneficiary, beneficiary add date should be at least 5 days back");
        assertEquals("To send more than 5000 to a beneficiary, beneficiary add date should be at least 5 days back", exception.getMessage());
    }

}
