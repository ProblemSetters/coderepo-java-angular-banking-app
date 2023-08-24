package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/core-banking/account")
public class AccountController {
  private final AccountService accountService;
  private final AccountRepository accountRepository;

  @Autowired
  public AccountController(AccountService accountService, AccountRepository accountRepository) {
    this.accountService = accountService;
    this.accountRepository = accountRepository;
  }

  //create
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Object createNewAccount(@RequestBody Account account) {
    Optional<Account> existing = accountRepository.findByEmailAddress(account.getEmailAddress());
    if (existing.isPresent()) {
      return "User with email address already exists.";
    } else {
      return accountService.createNewAccount(account);
    }
  }

  //get
  @GetMapping("/{accountId}")
  @ResponseStatus(HttpStatus.OK)
  public Account getAccountByAccountId(@PathVariable Long accountId) {
    return accountService.getAccountByAccountId(accountId);
  }

  //delete
  @DeleteMapping("/{accountId}")
  @ResponseStatus(HttpStatus.OK)
  public Account deleteAccountByAccountId(@PathVariable Long accountId) {
    return accountService.deleteAccountByAccountId(accountId);
  }


 //update
  @PutMapping("/{accountId}")
  @ResponseStatus(HttpStatus.OK)
  public Account updateAccountByAccountId(@RequestBody Account account, @PathVariable Long accountId) {
    return accountService.updateAccountByEmailAddress(accountId,account);
  }
}
