package com.hackerrank.corebanking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Card implements Serializable {
    @CreatedDate
    Date dateCreated;
    @LastModifiedDate
    Date lastCreated;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardNumber;
    private Long accountId;
    private String name;
    private double balance;
    private int pin;
    private boolean blocked = false;
    private String expireMonth;
    private String expireYear;
    private String cardHolderName;
    private int cvv;
}
