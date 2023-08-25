package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
  private final CardRepository cardRepository;

  @Autowired
  CardService(CardRepository cardRepository) {
    this.cardRepository = cardRepository;
  }


  public Card createNewCard(Card card) {
    if (card.getCardNumber() != null) {
      throw new IllegalArgumentException("The cardID must not be provided when creating a new card.");
    }

    return cardRepository.save(card);
  }

  public Card getCardByCardNumber(Long cardNumber) {
    return cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
  }

  public List<Card> getAllCards(Long accountId) {
    return cardRepository
            .findCardsByAccountId(accountId)
            .orElseThrow(() -> new IllegalArgumentException("Card with given accountId not found."));
  }

  public Card deleteCardByCardNumber(Long cardNumber) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
    cardRepository.delete(existing);

    return existing;
  }

  public Card updatePin(Long cardNumber, int newPin) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
    existing.setPin(newPin);
    cardRepository.save(existing);

    return existing;
  }

  public Card blockCard(Long cardNumber) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
    existing.setBlocked(true);
    cardRepository.save(existing);

    return existing;
  }

}
