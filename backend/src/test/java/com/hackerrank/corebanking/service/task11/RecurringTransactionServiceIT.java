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

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RecurringTransactionServiceIT {

    @Mock
    private RecurringTransactionRepository recurringTransactionRepository;

    @Mock
    private AccountService accountService;

    @InjectMocks
    private RecurringTransactionService recurringTransactionService;

    private Account account;
    private LocalDate startDate;
    private LocalDate endDate;
    private Date createdAt;
    private RecurringTransaction recurringTransaction;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        account = new Account();
        account.setAccountId(1L);
        startDate = LocalDate.now().plusDays(1);
        endDate = LocalDate.now().plusMonths(1);
        createdAt = new Date();

        recurringTransaction = new RecurringTransaction(account, 100.0, startDate, endDate, Frequency.DAILY, createdAt);
    }

    @Test
    public void testCreateRecurringTransaction() {
        RecurringTransaction recurringTransaction = new RecurringTransaction();
        recurringTransaction.setAmount(100.0);
        recurringTransaction.setAccount(account);
        recurringTransaction.setStartDate(startDate);
        recurringTransaction.setEndDate(endDate);
        recurringTransaction.setFrequency(Frequency.DAILY);

        when(accountService.getAccountByAccountId(account.getAccountId())).thenReturn(account);
        when(recurringTransactionRepository.save(any(RecurringTransaction.class))).thenReturn(recurringTransaction);

        RecurringTransaction savedTransaction = recurringTransactionService.createRecurringTransaction(
                account.getAccountId(), 100.0, startDate, endDate, Frequency.DAILY);

        assertNotNull(savedTransaction);
        assertEquals(100.0, savedTransaction.getAmount());
        assertEquals(account, savedTransaction.getAccount());
        assertEquals(startDate, savedTransaction.getStartDate());
        assertEquals(endDate, savedTransaction.getEndDate());
        assertEquals(Frequency.DAILY, savedTransaction.getFrequency());
    }

    @Test
    public void testGetAllRecurringTransactions() {
        RecurringTransaction transaction1 = new RecurringTransaction(account, 100.0, startDate, endDate, Frequency.DAILY, createdAt);
        RecurringTransaction transaction2 = new RecurringTransaction(account, 200.0, startDate, endDate, Frequency.MONTHLY, createdAt);

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
}
