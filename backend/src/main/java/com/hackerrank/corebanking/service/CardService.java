package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.util.CommonUtils;

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
    card.setCardNumber(CommonUtils.generate(16));
    return cardRepository.save(card);
  }

  public Card getCardByCardNumber(String cardNumber) {
    return cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
  }

  public List<Card> getAllCards(Long accountId) {
    return cardRepository
            .findCardsByAccountId(accountId)
            .orElseThrow(() -> new IllegalArgumentException("Card with given accountId not found."));
  }

  public Card deleteCardByCardNumber(String cardNumber) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
    cardRepository.delete(existing);

    return existing;
  }

  public Card updatePin(String cardNumber, int newPin) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));

    validatePin(newPin);

    existing.setPin(newPin);
    cardRepository.save(existing);

    return existing;
  }
private void validatePin(int pin) {

    if (pin < 0) {
        throw new UnsupportedOperationException("Pin must be positive number");
    }

    String pinString = String.valueOf(pin);

    if (pinString.length() != 4) {
        throw new UnsupportedOperationException("Pin must be of length 4");
    }

    char firstDigit = pinString.charAt(0);
    boolean isSequence = pinString.chars().allMatch(ch -> ch == firstDigit);
    if (isSequence) {
        throw new UnsupportedOperationException("Pin must not be a sequence of the same digits");
    }
}

  public Card blockCard(String cardNumber, boolean block) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
    existing.setBlocked(block);
    cardRepository.save(existing);

    return existing;
  }
}