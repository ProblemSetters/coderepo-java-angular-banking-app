package com.hackerrank.corebanking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "fraud_merchants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FraudMerchant {
    @Id
    private Long id;
    private Long accountNumber;
}