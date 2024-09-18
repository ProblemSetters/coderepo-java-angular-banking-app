package com.hackerrank.corebanking.scheduler;

import com.hackerrank.corebanking.model.RecurringTransaction;
import com.hackerrank.corebanking.model.Transaction;
import com.hackerrank.corebanking.model.Frequency;
import com.hackerrank.corebanking.service.RecurringTransactionService;
import com.hackerrank.corebanking.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class RecurringTransactionScheduler {
    private static final Logger logger = LoggerFactory.getLogger(RecurringTransactionScheduler.class);

    @Autowired
    private RecurringTransactionService recurringTransactionService;

    @Autowired
    private TransactionService transactionService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void processRecurringTransactions() {

        logger.info("Running recurring txn cron...");

        LocalDate today = LocalDate.now();

        List<RecurringTransaction> dueTransactions = recurringTransactionService.getDueRecurringTransactions(today);

        for (RecurringTransaction recurringTransaction : dueTransactions) {
            Long fromAccountId = recurringTransaction.getFromAccountId();
            Long toAccountId = recurringTransaction.getToAccountId();

            if (fromAccountId != null && toAccountId != null) {
                Transaction transaction = new Transaction();
                transaction.setFromAccountId(fromAccountId);
                transaction.setToAccountId(toAccountId);
                transaction.setTransferAmount(recurringTransaction.getAmount());
                transaction.setRecurringTransaction(recurringTransaction);

                transactionService.sendMoney(transaction);

                LocalDate nextExecutionDate = recurringTransactionService.calculateNextExecutionDate(today, recurringTransaction.getFrequency());
                if (nextExecutionDate != null && !nextExecutionDate.isBefore(today) && nextExecutionDate.isBefore(recurringTransaction.getEndDate())) {
                    recurringTransactionService.createRecurringTransaction(
                            recurringTransaction.getAccount(), fromAccountId, toAccountId, recurringTransaction.getAmount(),
                            nextExecutionDate, recurringTransaction.getEndDate(), recurringTransaction.getFrequency());
                }
            } else {
                logger.warn("Invalid account IDs for recurring transaction ID {}: From or to account ID is null.", recurringTransaction.getId());
            }
        }
    }
}