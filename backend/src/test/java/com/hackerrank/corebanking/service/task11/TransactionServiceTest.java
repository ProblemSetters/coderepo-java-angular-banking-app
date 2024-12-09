
package com.hackerrank.corebanking.service.task11;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.FraudDetectionService;
import com.hackerrank.corebanking.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class TransactionServiceTest {

    private TransactionService transactionService;
    private TransactionRepository transactionRepository;
    private AccountRepository accountRepository;
    private FraudDetectionService fraudDetectionService;

    @BeforeEach
    void setup() {
        transactionRepository = Mockito.mock(TransactionRepository.class);
        accountRepository = Mockito.mock(AccountRepository.class);
        fraudDetectionService = Mockito.mock(FraudDetectionService.class);
        transactionService = new TransactionService(transactionRepository, accountRepository, null, fraudDetectionService);
    }

    @Test
    void testSendMoneyFrequentTransaction() {
        when(fraudDetectionService.isSuspiciousTransaction(Mockito.any(Transaction.class))).thenReturn(true);
        Account account = new Account();
        account.setLocked(false);
        when(accountRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(account));

        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0);

        assertThrows(RuntimeException.class, () -> transactionService.sendMoney(transaction));

        assertTrue(account.isLocked(), "Account is locked due to suspicious activity");
    }

    @Test
    void testSendMoneyOddHourTransaction() {
        when(fraudDetectionService.isSuspiciousTransaction(Mockito.any(Transaction.class))).thenReturn(true);
        Account account = new Account();
        account.setLocked(false);
        when(accountRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(account));

        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0);
        transaction.setDateCreated(new Date());

        assertThrows(RuntimeException.class, () -> transactionService.sendMoney(transaction));

        assertTrue(account.isLocked(), "Account is locked due to suspicious activity");
    }

    @Test
    void testSendMoneyExceedsTransactionLimit() {
        when(fraudDetectionService.isSuspiciousTransaction(Mockito.any(Transaction.class))).thenReturn(true);
        Account account = new Account();
        account.setLocked(false);
        when(accountRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(account));

        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(15000.0);
        transaction.setDateCreated(new Date());

        assertThrows(RuntimeException.class, () -> transactionService.sendMoney(transaction));

        assertTrue(account.isLocked(), "Account is locked due to exceeding transaction limit");
    }

    @Test
    public void testSendMoney_SuspiciousMerchant() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(9999999991L);

        when(fraudDetectionService.isSuspiciousTransaction(transaction)).thenReturn(true);

        assertThrows(RuntimeException.class, () -> {
            transactionService.sendMoney(transaction);
        });
    }
}