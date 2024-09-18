package com.hackerrank.corebanking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

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
public class Transaction implements Serializable {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date dateCreated = new Date();
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date lastCreated = new Date();
    @TableGenerator(name = "tr_id_gen", table = "tr_id_gen", pkColumnName = "gen_name", valueColumnName = "gen_val", pkColumnValue = "gen_val", initialValue = 1042, allocationSize = 7)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "tr_id_gen")
    private Long transactionId;
    private Long fromAccountId;
    private String sourceCardNumber;
    private Long toAccountId;
    private Double transferAmount;

    @ManyToOne
    @JoinColumn(name = "recurring_transaction_id")
    @JsonBackReference
    private RecurringTransaction recurringTransaction;
}