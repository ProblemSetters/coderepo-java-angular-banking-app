package com.hackerrank.corebanking.util;

import java.util.Random;

public class CommonUtils {

    public static String generate(int length) {
        Random random = new Random(System.currentTimeMillis());

        // The number of random digits that we need to generate is equal to the
        // total length of the card number minus the start digits given by the
        // user, minus the check digit at the end.
        StringBuilder builder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10);
            builder.append(digit);
        }

        return builder.toString();
    }
}
