package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
