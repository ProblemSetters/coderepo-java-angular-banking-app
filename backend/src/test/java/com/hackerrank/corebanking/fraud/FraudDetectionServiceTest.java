package com.hackerrank.corebanking.fraud;

import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.FraudDetectionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class FraudDetectionServiceTest {

    private FraudDetectionService fraudDetectionService;
    private TransactionRepository transactionRepository;

    @BeforeEach
    void setup() {
        transactionRepository = Mockito.mock(TransactionRepository.class);
        fraudDetectionService = new FraudDetectionService(transactionRepository);
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
        calendar.set(Calendar.HOUR_OF_DAY, 2); // Set time to 2 AM
        Date oddHourDate = calendar.getTime();

        assertTrue(fraudDetectionService.isOddHourTransaction(oddHourDate), "Transaction should be flagged as odd hour");
    }

    @Test
    void testIsNotOddHourTransaction() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 10); // Set time to 10 AM
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
}