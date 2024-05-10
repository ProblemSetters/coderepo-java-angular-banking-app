package com.hackerrank.corebanking.controller.task8;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@SpringBootTest
class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Account mockFromAccount;
    private Account mockToAccount;

    @BeforeEach
    void setUp() {
        mockFromAccount = new Account();
        mockFromAccount.setAccountId(1L);
        mockFromAccount.setBalance(200.0); // Assuming a balance of 200 for the from account

        mockToAccount = new Account();
        mockToAccount.setAccountId(2L);
        mockToAccount.setBalance(100.0); // Assuming a balance of 100 for the to account
    }

    // @Test
    // void sendMoney_InsufficientBalance_ReturnsNull() {
    //     // Arrange
    //     Transaction transaction = new Transaction();
    //     transaction.setFromAccountId(1L);
    //     transaction.setToAccountId(2L);
    //     transaction.setTransferAmount(300.0); 

    //     when(accountRepository.findById(1L)).thenReturn(Optional.of(mockFromAccount));
    //     when(accountRepository.findById(2L)).thenReturn(Optional.of(mockToAccount));

    //     // Act
    //     Transaction result = transactionService.sendMoney(transaction);

    //     // Assert
    //     assertNull(result);
    // }

    @Test
    void sendMoney_InsufficientBalance_ReturnsErrorMessage() {
        // Arrange
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(300.0); // Assuming the transfer amount is more than the balance

        when(accountRepository.findById(1L)).thenReturn(Optional.of(mockFromAccount));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(mockToAccount));

        // Act
        Transaction result = transactionService.sendMoney(transaction);

        // Assert
        assertNull(result);
        assertEquals("Insufficient fund, transaction canceled", transactionService.getErrorMessage());
    }

    @Test
    void sendMoney_SufficientBalance_ReturnsTransaction() {
        // Arrange
        Transaction transaction = new Transaction();
        transaction.setFromAccountId(1L);
        transaction.setToAccountId(2L);
        transaction.setTransferAmount(100.0); 

        when(accountRepository.findById(1L)).thenReturn(Optional.of(mockFromAccount));
        when(accountRepository.findById(2L)).thenReturn(Optional.of(mockToAccount));

        // Act
        Transaction result = transactionService.sendMoney(transaction);

        // Assert
        assertEquals(100.0, mockFromAccount.getBalance() - mockToAccount.getBalance());
        assertEquals(300.0, mockFromAccount.getBalance() + mockToAccount.getBalance());
        assertNull(transactionService.getErrorMessage());
    }
}
