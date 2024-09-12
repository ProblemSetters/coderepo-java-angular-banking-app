package com.hackerrank.corebanking.service.task11;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.service.CardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.assertj.core.api.Assertions.assertThat;

public class CardServiceTest {

    private CardService cardService;
    private CardRepository mockCardRepository;

    @BeforeEach
    void setup() {
        mockCardRepository = Mockito.mock(CardRepository.class);
        cardService = new CardService(mockCardRepository);

        mockCardRepository.deleteAll();
    }

    @Test
    void GIVEN_card_not_virtual_EXPECT_no_virtual_txn_limit_rules_apply() {
        Card card = new Card();
        card.setVirtual(false);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 10000.0);

        assertThat(validVirtualTransaction).isTrue();
    }

    @Test
    void GIVEN_card_is_virtual_with_single_txn_allowed_with_no_limit_EXPECT_correct_virtual_txn_limit_rules_apply() {
        Card card = new Card();
        card.setVirtual(true);
        card.setTxnAllowedCount(1);
        card.setVirtualLimit(-1.0);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 10000.0);

        assertThat(validVirtualTransaction).isTrue();
    }

    @Test
    void GIVEN_card_is_virtual_with_single_txn_allowed_with_limit_EXPECT_correct_virtual_txn_limit_rules_apply() {
        Card card = new Card();
        card.setVirtual(true);
        card.setTxnAllowedCount(10);
        card.setVirtualLimit(10000.0);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 10000.0);

        assertThat(validVirtualTransaction).isTrue();
    }

    @Test
    void GIVEN_card_is_virtual_with_single_txn_allowed_with_limit_EXPECT_txn_amount_is_greater_EXPECT_txn_not_allowed() {
        Card card = new Card();
        card.setVirtual(true);
        card.setTxnAllowedCount(1);
        card.setVirtualLimit(10000.0);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 20000.0);

        assertThat(validVirtualTransaction).isFalse();
    }

    @Test
    void GIVEN_card_is_virtual_with_multiple_txn_allowed_with_no_limit_EXPECT_correct_virtual_txn_limit_rules_apply() {
        Card card = new Card();
        card.setVirtual(true);
        card.setTxnAllowedCount(10);
        card.setVirtualLimit(-1.0);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 10000.0);

        assertThat(validVirtualTransaction).isTrue();
    }

    @Test
    void GIVEN_card_is_virtual_with_multiple_txn_allowed_with_limit_EXPECT_correct_virtual_txn_limit_rules_apply() {
        Card card = new Card();
        card.setVirtual(true);
        card.setTxnAllowedCount(10);
        card.setVirtualLimit(10000.0);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 10000.0);

        assertThat(validVirtualTransaction).isTrue();
    }

    @Test
    void GIVEN_card_is_virtual_with_multiple_txn_allowed_with_limit_AND_txn_amount_is_greater_EXPECT_txn_not_allowed() {
        Card card = new Card();
        card.setVirtual(true);
        card.setTxnAllowedCount(10);
        card.setVirtualLimit(10000.0);

        boolean validVirtualTransaction = cardService.isVirtualTransactionAllowed(card, 20000.0);

        assertThat(validVirtualTransaction).isFalse();
    }
}
