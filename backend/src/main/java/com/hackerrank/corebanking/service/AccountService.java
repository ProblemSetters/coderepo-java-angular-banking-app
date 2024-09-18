package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
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

  public Account deleteAccountByAccountId(Long accountId) {
    Account existing = accountRepository
            .findById(accountId)
            .orElseThrow(() -> new IllegalArgumentException("Account with given accountId not found."));
    accountRepository.delete(existing);

    return existing;
  }

}