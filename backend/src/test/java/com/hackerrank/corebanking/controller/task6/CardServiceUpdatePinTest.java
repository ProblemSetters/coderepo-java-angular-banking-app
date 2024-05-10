package com.hackerrank.corebanking.controller.task6;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.service.CardService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class CardServiceUpdatePinTest {

    @Mock
    private CardRepository cardRepository;

    @InjectMocks
    private CardService cardService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUpdatePinCorrect() {
        String cardNumber = "1234567890123456";
        int newPin = 3442;
        Card existingCard = new Card();
        existingCard.setCardNumber(cardNumber);
        existingCard.setPin(5678); // Existing pin

        when(cardRepository.findCardByCardNumber(cardNumber)).thenReturn(Optional.of(existingCard));
        when(cardRepository.save(any(Card.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Card updatedCard = cardService.updatePin(cardNumber, newPin);

        // Assert
        assertEquals(newPin, updatedCard.getPin());
    }

    @Test
    public void testUpdatePinInvalidLength() {
        String cardNumber = "1234567890123456";
        int newPin = 29764;
        Card existingCard = new Card();
        existingCard.setCardNumber(cardNumber);
        existingCard.setPin(5678); 

        when(cardRepository.findCardByCardNumber(cardNumber)).thenReturn(Optional.of(existingCard));

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> cardService.updatePin(cardNumber, newPin));
        assertEquals("Pin must be of length 4", exception.getMessage());
    }

    @Test
    public void testUpdatePinInvalidNegative() {
        String cardNumber = "1234567890123456";
        int newPin = -2345;
        Card existingCard = new Card();
        existingCard.setCardNumber(cardNumber);
        existingCard.setPin(5678); 

        when(cardRepository.findCardByCardNumber(cardNumber)).thenReturn(Optional.of(existingCard));

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> cardService.updatePin(cardNumber, newPin));
        assertEquals("Pin must be a positive number", exception.getMessage());
    }

    @Test
    public void testUpdatePinInvalidSequence() {
        // Arrange
        String cardNumber = "1234567890123456";
        int newPin = 0000;
        Card existingCard = new Card();
        existingCard.setCardNumber(cardNumber);
        existingCard.setPin(5678);

        when(cardRepository.findCardByCardNumber(cardNumber)).thenReturn(Optional.of(existingCard));

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> cardService.updatePin(cardNumber, newPin));
        assertEquals("Pin must not be a sequence of the same digits", exception.getMessage());
    }

    // @Test
    // public void testUpdatePinInvalidNotInteger() {
    //     // Arrange
    //     String cardNumber = "1234567890123456";
    //     int newPin = 11222;
    //     Card existingCard = new Card();
    //     existingCard.setCardNumber(cardNumber);
    //     existingCard.setPin(5678); // Existing pin

    //     when(cardRepository.findCardByCardNumber(cardNumber)).thenReturn(Optional.of(existingCard));

    //     // Act & Assert
    //     IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
    //             () -> cardService.updatePin(cardNumber, newPin));
    //     assertEquals("Pin must be an integer", exception.getMessage());
    // }

}
