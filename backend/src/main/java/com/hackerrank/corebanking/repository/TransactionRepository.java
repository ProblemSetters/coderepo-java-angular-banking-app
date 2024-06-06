package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query(value = "SELECT * FROM TRANSACTION t " +
            "WHERE (CAST(t.date_created AS DATE) >= CAST (:from AS DATE) " +
            "AND CAST(t.date_created AS DATE) <= CAST(:to AS DATE)) " +
            "AND (t.from_account_id = :fromAccountId " +
            "OR t.to_account_id = :toAccountId)", nativeQuery = true)
    List<Transaction> findTransactionsByDateCreatedBetweenAndFromAccountIdOrToAccountId(@Param("from") Date from,
                                                                                        @Param("to") Date to,
                                                                                        @Param("fromAccountId") String fromAccountId,
                                                                                        @Param("toAccountId") String toAccountId);

    List<Transaction> findTransactionByFromAccountId(Long fromAccountId);
}
