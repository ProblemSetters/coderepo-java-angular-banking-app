package com.hackerrank.corebanking.service.task6;

import com.hackerrank.corebanking.model.Card;
import com.hackerrank.corebanking.repository.CardRepository;
import com.hackerrank.corebanking.service.CardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class CardServiceIT {

    @Autowired
    private CardService cardService;

    @Autowired
    private CardRepository cardRepository;

    private Card existingCard;

    @BeforeEach
    void setup() {
        cardRepository.deleteAll();

        existingCard = new Card();
        existingCard.setCardNumber("1111222233334444");
        existingCard.setPin(5465);
        existingCard = cardRepository.save(existingCard);
    }

    @Test
    void testUpdateWithCorrectPin() {
        assertDoesNotThrow(() -> cardService.updatePin(existingCard.getCardNumber(), 9265), "Should be does not error");
    }

    @Test
    void testUpdatePinLengthMoreThan4() {
        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> cardService.updatePin(existingCard.getCardNumber(), 85255));
        assertEquals("Pin must be of length 4", exception.getMessage());
    }

    @Test
    void testUpdatePinNegativeNumber() {
        UnsupportedOperationException exception = assertThrows(UnsupportedOperationException.class,
                () -> cardService.updatePin(existingCard.getCardNumber(), -8525));
        assertEquals("Pin must be positive number", exception.getMessage());
    }

    @Test
    void testUpdatePinSequence() {
        int first = generateSequencePinCode();
        int second = generateSequencePinCode();
        int third = generateSequencePinCode();
        int fifth = generateSequencePinCode();
        UnsupportedOperationException firstException = assertThrows(UnsupportedOperationException.class,
                () -> cardService.updatePin(existingCard.getCardNumber(), first));
        assertEquals("Pin must not be a sequence of the same digits", firstException.getMessage());

        UnsupportedOperationException secondException = assertThrows(UnsupportedOperationException.class,
                () -> cardService.updatePin(existingCard.getCardNumber(), second));
        assertEquals("Pin must not be a sequence of the same digits", secondException.getMessage());

        UnsupportedOperationException thirdException = assertThrows(UnsupportedOperationException.class,
                () -> cardService.updatePin(existingCard.getCardNumber(), third));
        assertEquals("Pin must not be a sequence of the same digits", thirdException.getMessage());

        UnsupportedOperationException fifthException = assertThrows(UnsupportedOperationException.class,
                () -> cardService.updatePin(existingCard.getCardNumber(), fifth));
        assertEquals("Pin must not be a sequence of the same digits", fifthException.getMessage());
    }

    private int generateSequencePinCode() {
        Random random = new Random();
        int digit = random.nextInt(9) + 1;
        return digit * 1111;
    }

}
