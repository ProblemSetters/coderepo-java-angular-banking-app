package com.hackerrank.corebanking.service.task11;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.repository.RecurringTransactionRepository;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.RecurringTransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RecurringTransactionServiceIT {

    @Mock
    private RecurringTransactionRepository recurringTransactionRepository;

    @Mock
    private AccountService accountService;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private RecurringTransactionService recurringTransactionService;

    private Account account;
    private Long fromAccountId;
    private Long toAccountId;
    private LocalDate startDate;
    private LocalDate endDate;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        account = Account.builder()
                .accountId(1L) // Set a mock account ID
                .firstName("John")
                .lastName("Doe")
                .emailAddress("john.doe@example.com")
                .build();

        fromAccountId = 1L;
        toAccountId = 2L;
        startDate = LocalDate.now().plusDays(1);
        endDate = LocalDate.now().plusMonths(1);

        when(userDetails.getUsername()).thenReturn("test@example.com");
        when(accountService.getAccountByEmailAddress("test@example.com")).thenReturn(account);
    }

    @Test
    public void testCreateRecurringTransaction() {
        RecurringTransaction recurringTransaction = RecurringTransaction.builder()
                .account(account)
                .fromAccountId(fromAccountId)
                .toAccountId(toAccountId)
                .amount(100.0)
                .startDate(startDate)
                .endDate(endDate)
                .frequency(Frequency.DAILY)
                .build();

        when(accountService.getAccountByEmailAddress(anyString())).thenReturn(account);
        when(recurringTransactionRepository.save(any(RecurringTransaction.class))).thenReturn(recurringTransaction);

        RecurringTransaction savedTransaction = recurringTransactionService.createRecurringTransaction(
                account, fromAccountId, toAccountId, 100.0, startDate, endDate, Frequency.DAILY);

        assertNotNull(savedTransaction);
        assertEquals(100.0, savedTransaction.getAmount());
        assertEquals(account, savedTransaction.getAccount());
        assertEquals(fromAccountId, savedTransaction.getFromAccountId());
        assertEquals(toAccountId, savedTransaction.getToAccountId());
        assertEquals(startDate, savedTransaction.getStartDate());
        assertEquals(endDate, savedTransaction.getEndDate());
        assertEquals(Frequency.DAILY, savedTransaction.getFrequency());
    }

    @Test
    public void testGetAllRecurringTransactions() {
        RecurringTransaction transaction1 = RecurringTransaction.builder()
                .account(account)
                .fromAccountId(fromAccountId)
                .toAccountId(toAccountId)
                .amount(100.0)
                .startDate(startDate)
                .endDate(endDate)
                .frequency(Frequency.DAILY)
                .build();
        RecurringTransaction transaction2 = RecurringTransaction.builder()
                .account(account)
                .fromAccountId(fromAccountId)
                .toAccountId(toAccountId)
                .amount(200.0)
                .startDate(startDate)
                .endDate(endDate)
                .frequency(Frequency.MONTHLY)
                .build();

        when(recurringTransactionRepository.findAll()).thenReturn(List.of(transaction1, transaction2));

        List<RecurringTransaction> transactions = recurringTransactionService.getAllRecurringTransactions();

        assertNotNull(transactions);
        assertEquals(2, transactions.size());
        assertEquals(transaction1.getAmount(), transactions.get(0).getAmount());
        assertEquals(transaction2.getFrequency(), transactions.get(1).getFrequency());
    }

    @Test
    public void testCalculateNextExecutionDate_Daily() {
        LocalDate today = LocalDate.now();
        LocalDate nextDate = recurringTransactionService.calculateNextExecutionDate(today, Frequency.DAILY);
        assertEquals(today.plusDays(1), nextDate);
    }

    @Test
    public void testCalculateNextExecutionDate_Weekly() {
        LocalDate today = LocalDate.now();
        LocalDate nextDate = recurringTransactionService.calculateNextExecutionDate(today, Frequency.WEEKLY);
        assertEquals(today.plusWeeks(1), nextDate);
    }

    @Test
    public void testCalculateNextExecutionDate_Monthly() {
        LocalDate today = LocalDate.now();
        LocalDate nextDate = recurringTransactionService.calculateNextExecutionDate(today, Frequency.MONTHLY);
        assertEquals(today.plusMonths(1), nextDate);
    }

    @Test
    public void testCreateRecurringTransaction_ThrowsException_WhenStartDateIsInPast() {
        LocalDate pastStartDate = LocalDate.now().minusDays(1);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            recurringTransactionService.createRecurringTransaction(account, fromAccountId, toAccountId, 100.0, pastStartDate, endDate, Frequency.DAILY);
        });
        assertEquals("Start date must be at least one day in the future.", exception.getMessage());
    }
}
