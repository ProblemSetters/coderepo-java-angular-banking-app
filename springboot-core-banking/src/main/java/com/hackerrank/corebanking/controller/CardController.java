package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/core-banking/card")
public class CardController {
  private final CardService cardService;

  @Autowired
  public CardController(CardService cardService) {
    this.cardService = cardService;
  }

  //create
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Card createNewCard(@RequestBody Card card) {
    return cardService.createNewCard(card);
  }

  //get
  @GetMapping("/{cardId}")
  @ResponseStatus(HttpStatus.OK)
  public Card getCardByCardId(@PathVariable Long cardId) {
    return cardService.getCardByCardId(cardId);
  }

  //delete
  @DeleteMapping("/{cardId}")
  @ResponseStatus(HttpStatus.OK)
  public Card deleteCardByCardId(@PathVariable Long cardId) {
    return cardService.deleteCardByCardId(cardId);
  }
}
