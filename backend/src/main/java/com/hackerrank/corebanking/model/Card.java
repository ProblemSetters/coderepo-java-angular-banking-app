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

    /* Virtual card properties
     *
     * Cases (isVirtual - true):
     * * Single txn allowed with no limit       - txnAllowedCount 1, virtualLimit -1
     * * Single txn allowed with limit          - txnAllowedCount 1, virtualLimit 5000.0
     * * Multiple txn allowed with no limit     - txnAllowedCount -1, virtualLimit -1 (like a normal card?)
     * * Multiple txn allowed with limit        - txnAllowedCount -1, virtualLimit 5000.0
     */
    private boolean isVirtual = false;
    private int txnAllowedCount = -1;
    private Double virtualLimit = -1.0;
}