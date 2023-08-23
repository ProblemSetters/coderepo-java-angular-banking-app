package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmailAddress(String emailAddress);
}
