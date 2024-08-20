package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
  private final TransactionRepository transactionRepository;
  private final AccountRepository accountRepository;
  private final CardRepository cardRepository;

  @Autowired
  TransactionService(
          TransactionRepository transactionRepository,
          AccountRepository accountRepository,
          CardRepository cardRepository) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
    this.cardRepository = cardRepository;
  }


  public Transaction sendMoney(Transaction transaction) {
    if (transaction.getFromAccountId() != null) {
      return sendMoneyFromAccount(transaction);
    } else if (transaction.getSourceCardNumber() != null) {
      return sendMoneyFromCard(transaction);
    } else {
      throw new RuntimeException("Transaction must have either a source account ID or a source card number.");
    }
  }

  public List<Transaction> totalTransactions(Long accountId) {
    return transactionRepository.findTransactionByFromAccountId(accountId);
  }


  public Object getErrorMessage() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getErrorMessage'");
  }

  private Transaction sendMoneyFromAccount(Transaction transaction) {
    Account fromAccount = accountRepository.findById(transaction.getFromAccountId())
            .orElseThrow(() -> new RuntimeException("Source account not found"));
    Account toAccount = accountRepository.findById(transaction.getToAccountId())
            .orElseThrow(() -> new RuntimeException("Destination account not found"));

    // Update balances
    fromAccount.setBalance(fromAccount.getBalance() - transaction.getTransferAmount());
    toAccount.setBalance(toAccount.getBalance() + transaction.getTransferAmount());

    accountRepository.save(fromAccount);
    accountRepository.save(toAccount);

    return transactionRepository.save(transaction);
  }

  private Transaction sendMoneyFromCard(Transaction transaction) {
    Card sourceCard = cardRepository.findById(transaction.getSourceCardNumber())
            .orElseThrow(() -> new RuntimeException("Source card not found"));
    Account toAccount = accountRepository.findById(transaction.getToAccountId())
            .orElseThrow(() -> new RuntimeException("Destination account not found"));

    validateTransactionBasedOnCardLimits(sourceCard, transaction.getTransferAmount());

    // Update balances
    sourceCard.setBalance(sourceCard.getBalance() - transaction.getTransferAmount());
    toAccount.setBalance(toAccount.getBalance() + transaction.getTransferAmount());

    cardRepository.save(sourceCard);
    accountRepository.save(toAccount);

    return transactionRepository.save(transaction);
  }

  private void validateTransactionBasedOnCardLimits(Card sourceCard, double transferAmount) {
    double totalDailyTransactions = calculateTotalDailyCardTransactions(sourceCard.getCardNumber());
    double totalMonthlyTransactions = calculateTotalMonthlyCardTransactions(sourceCard.getCardNumber());

    // Check if the new transaction would breach the daily limit
    if (totalDailyTransactions + transferAmount > sourceCard.getDAILY_TRANSACTION_LIMIT()) {
      throw new RuntimeException("Transaction cannot be completed as it exceeds the daily transaction limit.");
    }

    // Check if the new transaction would breach the monthly limit
    if (totalMonthlyTransactions + transferAmount > sourceCard.getMONTHLY_TRANSACTION_LIMIT()) {
      throw new RuntimeException("Transaction cannot be completed as it exceeds the monthly transaction limit.");
    }
  }

  private double calculateTotalDailyCardTransactions(String cardNumber) {
    LocalDate today = LocalDate.now();
    Date startDate = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
    Date endDate = Date.from(today.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

    return transactionRepository.findBySourceCardNumberAndTransactionDateBetween(
            cardNumber, startDate, endDate
    ).stream().mapToDouble(Transaction::getTransferAmount).sum();
  }

  private double calculateTotalMonthlyCardTransactions(String cardNumber) {
    YearMonth currentMonth = YearMonth.now();
    Date startDate = Date.from(currentMonth.atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
    Date endDate = Date.from(currentMonth.plusMonths(1).atDay(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

    return transactionRepository.findBySourceCardNumberAndTransactionDateBetween(
            cardNumber, startDate, endDate
    ).stream().mapToDouble(Transaction::getTransferAmount).sum();
  }
}
