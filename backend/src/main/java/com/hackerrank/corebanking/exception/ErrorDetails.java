package com.hackerrank.corebanking.exception;

import lombok.Getter;

import java.util.Date;

@Getter
public class ErrorDetails {

    // Getters
    private Date timestamp;
    private String message;
    private String details;

    // Constructor to initialize all fields
    public ErrorDetails(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    // Optional: toString() method for logging/debugging
    @Override
    public String toString() {
        return "ErrorDetails{" +
               "timestamp=" + timestamp +
               ", message='" + message + '\'' +
               ", details='" + details + '\'' +
               '}';
    }
}