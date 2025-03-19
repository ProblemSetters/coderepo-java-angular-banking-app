package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CardService cardService;
    private final CardRepository cardRepository;
    private final FraudDetectionService fraudDetectionService;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository, 
                             CardService cardService, CardRepository cardRepository, 
                             FraudDetectionService fraudDetectionService) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.cardService = cardService;
        this.cardRepository = cardRepository;
        this.fraudDetectionService = fraudDetectionService;
    }

    public Transaction sendMoney(Transaction transaction) {
        // Check if the transaction is a card transaction
        if (transaction.getSourceCardNumber() != null) {
            return processCardTransaction(transaction);
        }
        
        Account fromAccount = accountRepository.findById(transaction.getFromAccountId()).get();
        Account toAccount = accountRepository.findById(transaction.getToAccountId()).get();

        // Check if sender has sufficient funds
        if (fromAccount.getBalance() < transaction.getTransferAmount()) {
            throw new RuntimeException("Transaction cannot be completed due to insufficient balance.");
        }
        
        // Subtract from sender's account and add to receiver's account
        fromAccount.setBalance(fromAccount.getBalance() - transaction.getTransferAmount());
        toAccount.setBalance(toAccount.getBalance() + transaction.getTransferAmount());

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        return transactionRepository.save(transaction);
    }
    
    private Transaction processCardTransaction(Transaction transaction) {
        // Get the card
        Optional<Card> optionalCard = cardRepository.findById(transaction.getSourceCardNumber());
        if (!optionalCard.isPresent()) {
            throw new RuntimeException("Card not found");
        }
        
        Card card = optionalCard.get();
        Account toAccount = accountRepository.findById(transaction.getToAccountId()).get();
        
        // Check if card has sufficient balance
        if (card.getBalance() < transaction.getTransferAmount()) {
            throw new RuntimeException("Transaction cannot be completed due to insufficient balance.");
        }
        
        // Check daily transaction limit
        double dailySpent = getDailyTransactions(card.getCardNumber(), transaction.getDateCreated());
        if (dailySpent + transaction.getTransferAmount() > card.getDailyTransactionLimit()) {
            throw new RuntimeException("Transaction cannot be completed as it exceeds the daily transaction limit.");
        }
        
        // Check monthly transaction limit
        double monthlySpent = getMonthlyTransactions(card.getCardNumber(), transaction.getDateCreated());
        if (monthlySpent + transaction.getTransferAmount() > card.getMonthlyTransactionLimit()) {
            throw new RuntimeException("Transaction cannot be completed as it exceeds the monthly transaction limit.");
        }
        
        // Update card balance
        card.setBalance(card.getBalance() - transaction.getTransferAmount());
        cardRepository.save(card);
        
        // Update destination account balance
        toAccount.setBalance(toAccount.getBalance() + transaction.getTransferAmount());
        accountRepository.save(toAccount);
        
        return transactionRepository.save(transaction);
    }
    
    private double getDailyTransactions(String cardNumber, Date currentDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        
        // Set time to start of day
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startOfDay = calendar.getTime();
        
        // Set time to end of day
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date endOfDay = calendar.getTime();
        
        // Get all transactions for this card on this day
        List<Transaction> dailyTransactions = transactionRepository.findBySourceCardNumberAndTransactionDateBetween(
                cardNumber, startOfDay, endOfDay);
        
        // Calculate total amount
        return dailyTransactions.stream()
                .mapToDouble(Transaction::getTransferAmount)
                .sum();
    }
    
    private double getMonthlyTransactions(String cardNumber, Date currentDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        
        // Set time to start of month
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startOfMonth = calendar.getTime();
        
        // Set time to end of month
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date endOfMonth = calendar.getTime();
        
        // Get all transactions for this card in this month
        List<Transaction> monthlyTransactions = transactionRepository.findBySourceCardNumberAndTransactionDateBetween(
                cardNumber, startOfMonth, endOfMonth);
        
        // Calculate total amount
        return monthlyTransactions.stream()
                .mapToDouble(Transaction::getTransferAmount)
                .sum();
    }

    public List<Transaction> totalTransactions(Long accountId) {
        return transactionRepository.findTransactionByFromAccountId(accountId);
    }

    public Object getErrorMessage() {
        throw new UnsupportedOperationException("Unimplemented method 'getErrorMessage'");
    }
}