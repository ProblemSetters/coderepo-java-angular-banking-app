package com.hackerrank.corebanking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date dateCreated = new Date();
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date lastCreated = new Date();
    @Id
    private String cardNumber;
    private Long accountId;
    private String name;
    private double balance;
    private int pin;
    private boolean blocked = false;
    private String expireMonth;
    private String expireYear;
    private String cardHolderName;
    private int cvv;
    private boolean isVirtual = false;
    private int txnAllowedCount = -1;
    private Double virtualLimit = -1.0;
    
    // Add these new fields for transaction limits
    private double dailyTransactionLimit = 5000.0;
    private double monthlyTransactionLimit = 25000.0;
}