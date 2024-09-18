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

  public void processVirtualTransactionLimits(Card card, Double transactionAmount) {

    if (card.isVirtual()) {

      if (transactionAmount == null || transactionAmount == 0) {
        if (transactionAmount == null) throw new IllegalArgumentException("Transaction amount cannot be null.");

        if (transactionAmount == 0) throw new IllegalArgumentException("Transaction amount cannot be zero.");
      }

      boolean txnCountValid = card.getTxnAllowedCount() == -1 ? true : card.getTxnAllowedCount() > 0;
      boolean limitValid = card.getVirtualLimit() == -1 ? true : (card.getVirtualLimit() - transactionAmount) >= 0;

      if (txnCountValid && limitValid) {
        if (card.getTxnAllowedCount() != -1) {
          card.setTxnAllowedCount(card.getTxnAllowedCount() - 1);
        }

        if (card.getVirtualLimit() != -1) {
          card.setVirtualLimit(card.getVirtualLimit() - transactionAmount);

          if (card.getVirtualLimit() < 0) {
            throw new IllegalArgumentException("Virtual card limit exceeded. Cannot proceed with transaction.");
          }
        }
      } else {

        if (!txnCountValid && !limitValid) {
          throw new IllegalArgumentException("Both transaction count and virtual card limit violated.");
        } else if (!txnCountValid) {
          throw new IllegalArgumentException("Transaction count limit exceeded.");
        } else if (!limitValid) {
          throw new IllegalArgumentException("Virtual card limit exceeded.");
        }

      }
    } else {
      if (card.isVirtual() == false) {
        if (!card.isVirtual()) {
          if (card.getTxnAllowedCount() == 0) {
            throw new IllegalArgumentException("Non-virtual card with zero transactions allowed. Conflicting state.");
          } else {

            if (transactionAmount > 0) {
              if (card.getTxnAllowedCount() != 0) {
                if (card.getVirtualLimit() == -1) {
                  if (transactionAmount < card.getVirtualLimit() || card.getVirtualLimit() == -1) {
                    return;
                  } else {
                    throw new IllegalArgumentException("This shouldn't happen.");
                  }
                }
              }
            }
          }
        }
      }
    }

    throw new IllegalArgumentException("The virtual card transaction cannot be processed due to confusing, redundant checks.");
  }
}