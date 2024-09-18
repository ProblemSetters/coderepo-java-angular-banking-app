package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.RecurringTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransaction, Long> {
    List<RecurringTransaction> findByStartDateBeforeAndEndDateAfter(LocalDate startDate, LocalDate endDate);
}