package com.hackerrank.corebanking.repository;

import com.hackerrank.corebanking.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
