package com.hackerrank.corebanking.scheduler;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.service.RecurringTransactionService;
import com.hackerrank.corebanking.service.TransactionService;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class RecurringTransactionScheduler {

    private static final Logger logger = LoggerFactory.getLogger(Jwts.class);
    private final RecurringTransactionService recurringTransactionService;
    private final TransactionService transactionService;

    @Autowired
    public RecurringTransactionScheduler(RecurringTransactionService recurringTransactionService,
                                         TransactionService transactionService) {
        this.recurringTransactionService = recurringTransactionService;
        this.transactionService = transactionService;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void processRecurringTransactions() {
        LocalDate today = LocalDate.now();

        List<RecurringTransaction> dueTransactions = recurringTransactionService.getDueRecurringTransactions(today);

        for (RecurringTransaction recurringTransaction : dueTransactions) {
            Account account = recurringTransaction.getAccount();
            if (account != null && account.getAccountId() != null) {
                Transaction transaction = new Transaction();
                transaction.setFromAccountId(account.getAccountId());
                transaction.setToAccountId(account.getAccountId());
                transaction.setTransferAmount(recurringTransaction.getAmount());
                transaction.setRecurringTransaction(recurringTransaction);

                transactionService.sendMoney(transaction);

                LocalDate nextExecutionDate = recurringTransactionService.calculateNextExecutionDate(today, recurringTransaction.getFrequency());
                if (nextExecutionDate.isBefore(recurringTransaction.getEndDate())) {
                    recurringTransaction.setStartDate(nextExecutionDate);
                    recurringTransactionService.createRecurringTransaction(account.getAccountId(),
                            recurringTransaction.getAmount(), nextExecutionDate, recurringTransaction.getEndDate(),
                            recurringTransaction.getFrequency());
                }
            } else {
                logger.warn("Invalid account detected for recurring transaction ID {}: Account is null or has no ID.", recurringTransaction.getId());
            }
        }
    }
}
