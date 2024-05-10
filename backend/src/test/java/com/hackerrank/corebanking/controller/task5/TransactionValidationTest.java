package com.hackerrank.corebanking.controller.task5;

import com.hackerrank.corebanking.controller.TransactionController;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.BeneficiaryRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.BeneficiaryService;
import com.hackerrank.corebanking.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@SpringBootTest
class TransactionValidationTest {

    @Mock
    private TransactionService transactionService;

    @Mock
    private AccountService accountService;

    @Mock
    private BeneficiaryService beneficiaryService;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private BeneficiaryRepository beneficiaryRepository;

    @InjectMocks
    private TransactionController transactionController;

    private Account senderAccount;
    private Account receiverAccount;

    @BeforeEach
    void setup() {
        // Mocking sender and receiver accounts
        senderAccount = new Account();
        senderAccount.setAccountId(1L);
        senderAccount.setBalance(50000.0);

        receiverAccount = new Account();
        receiverAccount.setAccountId(2L);

        when(accountService.getAccountByAccountId(1L)).thenReturn(senderAccount);
        when(accountService.getAccountByAccountId(2L)).thenReturn(receiverAccount);
    }

    @Test
    void sendMoney_NotInBeneficiaryList_NoRestrictionOnAmount() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(7000.0);

        when(transactionService.sendMoney(transaction)).thenReturn(transaction);

        Transaction result = transactionController.sendMoney(transaction);

        assertEquals(transaction, result);
        assertNull(transactionController.getErrorMessage());
    }

    @Test
    void sendMoney_WithBeneficiaryList_RestrictionOnAmount() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(6000.0); // More than 5000

        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary.setDateCreated(new Date());

        when(beneficiaryRepository.save(beneficiary)).thenReturn(beneficiary);

        when(transactionService.sendMoney(transaction)).thenReturn(transaction);

        Transaction result = transactionController.sendMoney(transaction);

        assertEquals(transaction, result);
        assertEquals("Amount exceeds limit for newly added beneficiary", transactionController.getErrorMessage());
    }

    @Test
    void sendMoney_WithBeneficiaryList_sixDaysago() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(6000.0); 

        // Creating a beneficiary with added date set to 6 days ago
        Beneficiary beneficiary = new Beneficiary();
        beneficiary.setPayerAccountId(senderAccount.getAccountId());
        beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
        beneficiary.setDateCreated(Date.from(Instant.now().minus(6, ChronoUnit.DAYS))); // Set added date 6 days ago

        when(beneficiaryRepository.save(beneficiary)).thenReturn(beneficiary);

        when(transactionService.sendMoney(transaction)).thenReturn(transaction);

        Transaction result = transactionController.sendMoney(transaction);

        assertNull(result);
        assertEquals("Transfer Successful", transactionController.getErrorMessage());
    }
}
