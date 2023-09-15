package com.hackerrank.corebanking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date dateCreated;
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date lastCreated;
    @TableGenerator(name = "ac_id_gen", table = "ac_id_gen", pkColumnName = "gen_name", valueColumnName = "gen_val", pkColumnValue = "ac_gen", initialValue = 2131111231, allocationSize = 9)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "ac_id_gen")
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
