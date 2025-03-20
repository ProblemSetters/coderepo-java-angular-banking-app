package com.hackerrank.corebanking.service.task11;

import com.hackerrank.corebanking.exception.FraudTransactionException;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.FraudDetectionService;
import com.hackerrank.corebanking.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TransactionServiceTest {

    private FraudDetectionService mockFraudDetectionService;

    private TransactionService transactionService;
    private TransactionRepository mockTransactionRepository;
    private AccountRepository mockAccountRepository;
    private FraudDetectionService fraudDetectionService;

    @BeforeEach
    void setup() {
        mockTransactionRepository = mock(TransactionRepository.class);
        mockAccountRepository = mock(AccountRepository.class);
        fraudDetectionService = mock(FraudDetectionService.class);

        mockFraudDetectionService = new FraudDetectionService(mockTransactionRepository);
        transactionService = new TransactionService(mockTransactionRepository, mockAccountRepository, null, fraudDetectionService);
    }

    @Test
    void testSendMoneyFrequentTransaction() {
        when(fraudDetectionService.isSuspiciousTransaction(Mockito.any(Transaction.class))).thenReturn(true);
        Account account = new Account();
        account.setLocked(false);
        when(mockAccountRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(account));

        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0);

        assertThrows(FraudTransactionException.class, () -> transactionService.sendMoney(transaction));
    }

    @Test
    public void testSendMoney_SuspiciousMerchant() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(9999999991L);

        Account account = new Account();
        account.setLocked(false);

        when(mockAccountRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(account));
        when(fraudDetectionService.isSuspiciousTransaction(transaction)).thenReturn(true);

        assertThrows(FraudTransactionException.class, () -> transactionService.sendMoney(transaction));
    }

    @Test
    void testIsFrequentTransaction() {
        List<Transaction> transactions = Collections.nCopies(6, new Transaction());
        when(mockTransactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(LocalDateTime.class)))
                .thenReturn(transactions);

        assertTrue(mockFraudDetectionService.isFrequentTransaction(1L));
    }

    @Test
    void testIsNotFrequentTransaction() {
        List<Transaction> transactions = Collections.nCopies(2, new Transaction());
        when(mockTransactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(LocalDateTime.class)))
                .thenReturn(transactions);

        assertFalse(mockFraudDetectionService.isFrequentTransaction(1L));
    }

    @Test
    void testIsSuspiciousMerchant() {
        Long suspiciousAccountNumber = 9999999991L;

        boolean result = mockFraudDetectionService.isSuspiciousMerchant(suspiciousAccountNumber);

        assertTrue(result);
    }

    @Test
    void testIsNotSuspiciousMerchant() {
        Long nonSuspiciousAccountNumber = 1234567890L;

        boolean result = mockFraudDetectionService.isSuspiciousMerchant(nonSuspiciousAccountNumber);

        assertFalse(result);
    }
}