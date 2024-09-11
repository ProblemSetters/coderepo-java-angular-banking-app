package com.hackerrank.corebanking.service.task10;

import com.hackerrank.corebanking.controller.security.AuthController;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.BeneficiaryRepository;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import com.hackerrank.corebanking.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TransactionServiceTest {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private AuthController authController;

    private Account senderAccount;
    private Account receiverAccount;
    private Account secondReceiverAccount;
    private Card sourceCard;

    @BeforeEach
    void setup() {
        accountRepository.deleteAll();
        beneficiaryRepository.deleteAll();
        transactionRepository.deleteAll();

        sourceCard = Card.builder()
                .cardNumber("1234-5678-9876-5432")
                .accountId(1L)
                .name("Test Card")
                .balance(50000.0)
                .pin(1234)
                .expireMonth("12")
                .expireYear("25")
                .cardHolderName("Test User")
                .cvv(123)
                .build();

        sourceCard = cardRepository.save(sourceCard);

        senderAccount = new Account();
        senderAccount.setEmailAddress("test@gmail.com");
        senderAccount.setPassword("112233");
        senderAccount.setBalance(50000.0);

        receiverAccount = new Account();
        secondReceiverAccount = new Account();

        senderAccount = accountRepository.save(senderAccount);
        receiverAccount = accountRepository.save(receiverAccount);
        secondReceiverAccount = accountRepository.save(secondReceiverAccount);

        authController.authenticateUser(senderAccount);
    }

    @Test
    public void testSuccessfulCardTransaction() {
        Transaction transaction = createTransaction(3000.0, new Date());

        Transaction result = transactionService.sendMoney(transaction);

        assertNotNull(result);
        assertNotNull(result.getTransactionId());
        assertEquals(47000.0, cardRepository.findById(sourceCard.getCardNumber()).get().getBalance());
    }

    @Test
    public void testCardTransactionFailsDueToDailyLimit() {
        transactionService.sendMoney(createTransaction(4000.0, new Date()));

        Transaction transaction = createTransaction(2000.0, new Date());

        assertThrows(RuntimeException.class, () -> transactionService.sendMoney(transaction), "Transaction cannot be completed as it exceeds the daily transaction limit.");
    }

    @Test
    public void testCardTransactionFailsDueToMonthlyLimit() {

        Transaction transaction1 = createTransaction(4500.0, java.sql.Date.valueOf(LocalDate.now().minusWeeks(10)));
        Transaction transaction2 = createTransaction(4500.0, java.sql.Date.valueOf(LocalDate.now().minusWeeks(3)));
        Transaction transaction3 = createTransaction(4500.0, java.sql.Date.valueOf(LocalDate.now().minusWeeks(2)));
        Transaction transaction4 = createTransaction(4500.0, java.sql.Date.valueOf(LocalDate.now().minusWeeks(1)));

        transactionService.sendMoney(transaction1);
        transactionService.sendMoney(transaction2);
        transactionService.sendMoney(transaction3);
        transactionService.sendMoney(transaction4);

        Transaction transaction = createTransaction(15000.0, new Date());

        assertThrows(RuntimeException.class, () -> transactionService.sendMoney(transaction), "Transaction cannot be completed as it exceeds the monthly transaction limit.");
    }

    @Test
    public void testCardTransactionFailsDueToInsufficientBalance() {
        Transaction transaction = createTransaction(60000.0, new Date());

        assertThrows(RuntimeException.class, () -> transactionService.sendMoney(transaction), "Transaction cannot be completed due to insufficient balance.");
    }

    private Transaction createTransaction(double amount, Date txnDate) {
        Transaction transaction = new Transaction();
        transaction.setSourceCardNumber(sourceCard.getCardNumber());
        transaction.setToAccountId(receiverAccount.getAccountId());
        transaction.setDateCreated(txnDate);
        transaction.setTransferAmount(amount);
        return transaction;
    }
}
