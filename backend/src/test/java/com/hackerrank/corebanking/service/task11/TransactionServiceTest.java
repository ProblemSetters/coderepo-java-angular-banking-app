
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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
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

        assertThrows(FraudTransactionException.class, () -> transactionService.sendMoney(transaction));
    }

    @Test
    public void testSendMoney_SuspiciousMerchant() {
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(9999999991L);

        Account account = new Account();
        account.setLocked(false);

        when(accountRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(account));
        when(fraudDetectionService.isSuspiciousTransaction(transaction)).thenReturn(true);

        assertThrows(FraudTransactionException.class, () -> transactionService.sendMoney(transaction));
    }
}