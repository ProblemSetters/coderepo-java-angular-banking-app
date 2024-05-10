package com.hackerrank.corebanking.controller.task7;
import static org.mockito.Mockito.*;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.repository.BeneficiaryRepository;
import com.hackerrank.corebanking.service.TransactionService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class FraudTransactionTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Account senderAccount;
    private Account receiverAccount;

    @BeforeEach
    void setup() {
        senderAccount = new Account();
        senderAccount.setAccountId(1L);
        senderAccount.setBalance(10000.0);

        receiverAccount = new Account();
        receiverAccount.setAccountId(2L);

        when(accountRepository.findById(1L)).thenReturn(java.util.Optional.of(senderAccount));
        when(accountRepository.findById(2L)).thenReturn(java.util.Optional.of(receiverAccount));
    }

    @Test
    void sendMoney_SameAmount5TimesWithinADay_FraudTransaction() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0);

        List<Transaction> senderTransactions = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Transaction senderTransaction = new Transaction();
            senderTransaction.setFromAccountId(1L);
            senderTransaction.setToAccountId(2L);
            senderTransaction.setTransferAmount(100.0);
            senderTransaction.setDateCreated(new Date());
            senderTransactions.add(senderTransaction);
        }

        when(transactionRepository.findTransactionByFromAccountId(1L)).thenReturn(senderTransactions);

        Transaction result = transactionService.sendMoney(transaction);

        assertNotNull(result);
        assertEquals("Fraud Transaction Alert", transactionService.getErrorMessage());
    }

    @Test
    void sendMoney_ReceiverNotInBeneficiaryListAndNoPreviousTransactions_FraudTransaction() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0);

        Transaction result = transactionService.sendMoney(transaction);

        assertNotNull(result);
        assertEquals("Fraud Transaction Alert", transactionService.getErrorMessage());
    }

// @Test
// void sendMoney_ReceiverInBeneficiaryListAndAddedToday_FraudTransaction() {
//     Transaction transaction = new Transaction();
//     transaction.setFromAccountId(1L);
//     transaction.setToAccountId(2L);
//     transaction.setTransferAmount(100.0);

//     List<Transaction> senderTransactions = new ArrayList<>();
//     Transaction senderTransaction = new Transaction();
//     senderTransaction.setFromAccountId(1L);
//     senderTransaction.setToAccountId(2L);
//     senderTransaction.setTransferAmount(100.0);
//     senderTransaction.setDateCreated(new Date());
//     senderTransactions.add(senderTransaction);

//     List<Transaction> receiverTransactions = new ArrayList<>();

//     // Receiver added to beneficiary list today
//     Beneficiary beneficiary = new Beneficiary();
//     beneficiary.setPayerAccountId(senderAccount.getAccountId());
//     beneficiary.setBeneficiaryAccountId(receiverAccount.getAccountId());
//     beneficiary.setDateCreated(new Date());

//     when(beneficiaryRepository.save(any(Beneficiary.class))).thenReturn(beneficiary);
//     when(transactionRepository.findTransactionByFromAccountId(1L)).thenReturn(senderTransactions);
//     when(transactionRepository.findTransactionByFromAccountId(2L)).thenReturn(receiverTransactions);

//     Transaction result = transactionService.sendMoney(transaction);

//     assertNotNull(result);
//     assertEquals("Fraud Transaction Alert", transactionService.getErrorMessage());
// }

    @Test
    void sendMoney_ValidTransaction_ReturnsTransaction() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0);

        Transaction result = transactionService.sendMoney(transaction);

        assertNotNull(result);
    }
}
