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
public class Transaction implements Serializable {
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date dateCreated;
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    Date lastCreated;
    @TableGenerator(name = "tr_id_gen", table = "tr_id_gen", pkColumnName = "gen_name", valueColumnName = "gen_val", pkColumnValue = "gen_val", initialValue = 1119, allocationSize = 7)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "tr_id_gen")
    private Long transactionId;
    private Long fromAccountId;
    private Long toAccountId;
    private Double transferAmount;
}
