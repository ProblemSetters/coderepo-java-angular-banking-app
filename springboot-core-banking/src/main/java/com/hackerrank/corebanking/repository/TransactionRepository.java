package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findTransactionsByDateCreatedBetweenAndFromAccountIdOrToAccountId(Date from, Date to, String fromAccountId, String toAccountId);
    List<Transaction> findTransactionByFromAccountId(Long fromAccountId);
}
