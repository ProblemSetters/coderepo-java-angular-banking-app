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
  public CardService(CardRepository cardRepository) {
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
    //TODO: pin validation before saving
    /**
     * 1. pin must be of length 4.
     * 2. pin must be integer.
     * 3. pin must not be a sequence of same digits like 1111, 0000, 3333, etc.
     * 4. pin must be positive number
     */
    existing.setPin(newPin);
    cardRepository.save(existing);

    return existing;
  }

  public Card blockCard(String cardNumber, boolean block) {
    Card existing = cardRepository
            .findCardByCardNumber(cardNumber)
            .orElseThrow(() -> new IllegalArgumentException("Card with given cardNumber not found."));
    existing.setBlocked(block);
    cardRepository.save(existing);

    return existing;
  }

  public boolean isVirtualTransactionAllowed(Card card, Double transactionAmount) {
    if (!card.isVirtual()) return true;

    return (card.getTxnAllowedCount() == -1 || card.getTxnAllowedCount() > 0)
           && (card.getVirtualLimit() == -1 || (card.getVirtualLimit() - transactionAmount) >= 0);
  }

  public void consumeVirtualTxnLimits(Card card, Double transactionAmount) {
    if (!isVirtualTransactionAllowed(card, transactionAmount)) throw new IllegalArgumentException("The txn will violate virtual card limits.");

    card.setTxnAllowedCount(card.getTxnAllowedCount() - 1);
    card.setVirtualLimit(card.getVirtualLimit() - transactionAmount);

    cardRepository.save(card);
  }
}
