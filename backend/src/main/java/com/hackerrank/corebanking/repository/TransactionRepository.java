package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
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

    List<Transaction> findTransactionsByFromAccountIdAndDateCreatedAfter(Long fromAccountId, Date dateCreated);

    @Query("SELECT t FROM Transaction t WHERE t.fromAccountId = :accountId AND t.dateCreated BETWEEN :startDate AND :endDate")
    List<Transaction> findByFromAccountIdAndTransactionDateBetween(
            @Param("accountId") Long accountId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );

    @Query("SELECT t FROM Transaction t WHERE t.sourceCardNumber = :cardNumber AND t.dateCreated BETWEEN :startDate AND :endDate")
    List<Transaction> findBySourceCardNumberAndTransactionDateBetween(
            @Param("cardNumber") String cardNumber,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
}
