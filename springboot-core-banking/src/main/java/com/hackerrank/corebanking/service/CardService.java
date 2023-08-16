package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public Card getCardByCardId(Long cardId) {
    return cardRepository
            .findById(cardId)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardId not found."));
  }

  public Card deleteCardByCardId(Long cardId) {
    Card existing = cardRepository
            .findById(cardId)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardId not found."));
    cardRepository.delete(existing);

    return existing;
  }

}
