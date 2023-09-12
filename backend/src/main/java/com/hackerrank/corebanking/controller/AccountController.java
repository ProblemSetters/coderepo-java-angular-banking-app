package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.AccountDTO;
import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.AccountRepository;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.CardService;
import com.hackerrank.corebanking.service.TransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/core-banking/account")
public class AccountController {
  private final AccountService accountService;
  private final CardService cardService;
  private final AccountRepository accountRepository;
  private final TransactionService transactionService;
  private final ModelMapper mapper;

  @Autowired
  public AccountController(AccountService accountService, CardService cardService, AccountRepository accountRepository, TransactionService transactionService) {
    this.accountService = accountService;
    this.cardService = cardService;
    this.accountRepository = accountRepository;
    this.transactionService = transactionService;
    this.mapper = new ModelMapper();
  }

  //create
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Object createNewAccount(@RequestBody Account account) {
    Optional<Account> existing = accountRepository.findByEmailAddress(account.getEmailAddress());
    if (existing.isPresent()) {
      return "User with email address already exists.";
    } else {
      Account newAccount = accountService.createNewAccount(account);

      //create 2 default cards
      Random random = new Random();

      Card card1 = new Card();
      card1.setAccountId(newAccount.getAccountId());
      card1.setPin(1111 + random.nextInt(1111));
      card1.setBlocked(false);
      card1.setName("Visa");
      card1.setExpireMonth("08");
      card1.setExpireYear("2035");
      card1.setCardHolderName("test3");
      card1.setCvv(345);
      cardService.createNewCard(card1);

      Card card2 = new Card();
      card2.setAccountId(newAccount.getAccountId());
      card2.setPin(1111 + random.nextInt(1111));
      card2.setBlocked(false);
      card2.setName("MasterCard");
      card2.setExpireMonth("08");
      card2.setExpireYear("2035");
      card2.setCardHolderName("test3");
      card2.setCvv(345);
      cardService.createNewCard(card2);

      return newAccount;
    }
  }

  //get
  @GetMapping("/{accountId}")
  @ResponseStatus(HttpStatus.OK)
  public Account getAccountByAccountId(@PathVariable Long accountId) {
    return accountService.getAccountByAccountId(accountId);
  }

  //get account of logged-in user
  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public AccountDTO getAccount() {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountService.getAccountByEmailAddress(userDetails.getUsername());
    AccountDTO accountDTO = mapper.map(account, AccountDTO.class);

    int totalCards = (int) cardService.getAllCards(account.getAccountId()).stream().count();
    accountDTO.setTotalCards(totalCards);

    int totalTrans = (int) transactionService.totalTransactions(account.getAccountId()).stream().count();
    accountDTO.setTotalTransactions(totalTrans);

    return accountDTO;
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
