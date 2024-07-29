package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.repository.AccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
@Transactional
public class AccountService {
  private final AccountRepository accountRepository;

  @Autowired
  AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }


  public Account createNewAccount(Account account) {
    if (account.getAccountId() != null) {
      throw new IllegalArgumentException("The accountID must not be provided when creating a new account.");
    }

    return accountRepository.save(account);
  }

  public Account getAccountByAccountId(Long accountId) {
    return accountRepository
            .findById(accountId)
            .orElseThrow(() -> new IllegalArgumentException("Account with given accountId not found."));
  }

  public Account getAccountByEmailAddress(String emailAddress) {
    return accountRepository
            .findByEmailAddress(emailAddress)
            .orElseThrow(() -> new IllegalArgumentException("Account with given emailAddress not found."));
  }

  public Account updateAccountByEmailAddress(Long accountId, Account updatedAccount) {
    Account existing = accountRepository
            .findById(accountId)
            .orElseThrow(() -> new IllegalArgumentException("Account with given accountId not found."));
    existing.setEmailAddress(updatedAccount.getEmailAddress());
    accountRepository.save(existing);

    return existing;
  }

  public Account deleteAccountByAccountId(Long accountId, boolean softDelete) {
    Account existing = accountRepository
            .findById(accountId)
            .orElseThrow(() -> new IllegalArgumentException("Account with given accountId not found."));

    if (softDelete) {
      existing.setDeleted(true);
      existing.setDeletedAt(Date.from(Instant.now()));
      return accountRepository.save(existing);
    }

    accountRepository.delete(existing);
    return existing;
  }

}
