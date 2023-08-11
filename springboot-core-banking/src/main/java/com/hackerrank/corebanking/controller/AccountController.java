package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/core-banking/account")
public class AccountController {
  private final AccountService accountService;

  @Autowired
  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  //create
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Account createNewAccount(@RequestBody Account account) {
    return accountService.createNewAccount(account);
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
