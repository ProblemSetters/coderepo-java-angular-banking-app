package com.hackerrank.corebanking.fraudanalysis;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.FraudMerchantRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.FraudDetectionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class FraudDetectionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private FraudMerchantRepository fraudMerchantRepository;

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

        assertTrue(fraudDetectionService.isFrequentTransaction(1L));
    }

    @Test
    void testIsNotFrequentTransaction() {
        List<Transaction> transactions = Collections.nCopies(4, new Transaction());
        when(transactionRepository.findTransactionsByFromAccountIdAndDateCreatedAfter(Mockito.anyLong(), Mockito.any(Date.class)))
                .thenReturn(transactions);

        assertFalse(fraudDetectionService.isFrequentTransaction(1L));
    }

    @Test
    void testIsOddHourTransaction() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 2);
        Date oddHourDate = calendar.getTime();

        assertTrue(fraudDetectionService.isOddHourTransaction(oddHourDate), "Transaction should be flagged as odd hour");
    }

    @Test
    void testIsNotOddHourTransaction() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 10);
        Date normalHourDate = calendar.getTime();

        assertFalse(fraudDetectionService.isOddHourTransaction(normalHourDate), "Transaction should not be flagged as odd hour");
    }

    @Test
    void testExceedsTransactionLimit() {
        assertTrue(fraudDetectionService.exceedsTransactionLimit(15000.0), "Transaction should exceed the limit");
    }

    @Test
    void testDoesNotExceedTransactionLimit() {
        assertFalse(fraudDetectionService.exceedsTransactionLimit(5000.0), "Transaction should not exceed the limit");
    }

    @Test
    void testIsSuspiciousMerchant() {
        Long suspiciousAccountNumber = 9999999991L;

        when(fraudMerchantRepository.existsByAccountNumber(suspiciousAccountNumber)).thenReturn(true);

        boolean result = fraudDetectionService.isSuspiciousMerchant(suspiciousAccountNumber);

        assertTrue(result);
    }

    @Test
    void testIsNotSuspiciousMerchant() {
        Long nonSuspiciousAccountNumber = 1234567890L;

        when(fraudMerchantRepository.existsByAccountNumber(nonSuspiciousAccountNumber)).thenReturn(false);

        boolean result = fraudDetectionService.isSuspiciousMerchant(nonSuspiciousAccountNumber);

        assertFalse(result);
    }
}