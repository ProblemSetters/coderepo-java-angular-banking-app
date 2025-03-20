package com.hackerrank.corebanking.service.task11;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.FraudDetectionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class FraudDetectionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private FraudDetectionService fraudDetectionService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testIsFrequentTransaction() {
        List<Transaction> transactions = Collections.nCopies(6, new Transaction());
        when(transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(Date.class)))
                .thenReturn(transactions);
        when(transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(LocalDateTime.class)))
                .thenReturn(transactions);

        assertTrue(fraudDetectionService.isFrequentTransaction(1L));
    }

    @Test
    void testIsNotFrequentTransaction() {
        List<Transaction> transactions = Collections.nCopies(4, new Transaction());
        when(transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(Date.class)))
                .thenReturn(transactions);
        when(transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(LocalDateTime.class)))
                .thenReturn(transactions);

        assertFalse(fraudDetectionService.isFrequentTransaction(1L));
    }

    @Test
    void testIsSuspiciousMerchant() {
        Long suspiciousAccountNumber = 9999999991L;

        boolean result = fraudDetectionService.isSuspiciousMerchant(suspiciousAccountNumber);

        assertTrue(result);
    }

    @Test
    void testIsNotSuspiciousMerchant() {
        Long nonSuspiciousAccountNumber = 1234567890L;

        boolean result = fraudDetectionService.isSuspiciousMerchant(nonSuspiciousAccountNumber);

        assertFalse(result);
    }
}