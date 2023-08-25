package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/core-banking/card")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CardController {
  private final CardService cardService;

  @Autowired
  public CardController(CardService cardService) {
    this.cardService = cardService;
  }

  //create new card
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Card createNewCard(@RequestBody Card card) {
    return cardService.createNewCard(card);
  }

  //get a card
  @GetMapping("/{cardNumber}")
  @ResponseStatus(HttpStatus.OK)
  public Card getCardByCardNumber(@PathVariable Long cardNumber) {
    return cardService.getCardByCardNumber(cardNumber);
  }


  //get all cards of an account
  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<Card> getAllCards(@RequestParam(name = "accountId") Long accountId) {
    return cardService.getAllCards(accountId);
  }


  //delete card
  @DeleteMapping("/{cardNumber}")
  @ResponseStatus(HttpStatus.OK)
  public Card deleteCardByCardNumber(@PathVariable Long cardNumber) {
    return cardService.deleteCardByCardNumber(cardNumber);
  }

  //update pin
  @PutMapping("/{cardNumber}")
  @ResponseStatus(HttpStatus.OK)
  public Card updatePin(@PathVariable Long cardNumber, @RequestParam(name = "newPin") int newPin) {
    return cardService.updatePin(cardNumber, newPin);
  }

  //block card
  @PutMapping("/{cardNumber}")
  @ResponseStatus(HttpStatus.OK)
  public Card blockCard(@PathVariable Long cardNumber) {
    return cardService.blockCard(cardNumber);
  }
}
