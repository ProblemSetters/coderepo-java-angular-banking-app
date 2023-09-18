package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, String> {
    Optional<Card> findCardByCardNumber(String cardNumber);

    Optional<List<Card>> findCardsByAccountId(Long accountId);
}
