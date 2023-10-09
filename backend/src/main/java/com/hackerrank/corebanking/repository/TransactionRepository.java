package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE (t.dateCreated >=  ?1 AND t.dateCreated <= ?2) AND (t.fromAccountId = ?3 OR t.toAccountId = ?4)")
    List<Transaction> findTransactionsByDateCreatedBetweenAndFromAccountIdOrToAccountId(Date from, Date to, String fromAccountId, String toAccountId);
    List<Transaction> findTransactionByFromAccountId(Long fromAccountId);
}
