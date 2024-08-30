package com.hackerrank.corebanking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class RecurringTransaction implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany(mappedBy = "recurringTransaction", cascade = CascadeType.ALL)
    private Set<Transaction> transactions;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    private Date createdAt;

    public RecurringTransaction(Account account, Double amount, LocalDate startDate, LocalDate endDate, Frequency frequency, Date createdAt) {
        this.account = account;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.frequency = frequency;
        this.createdAt = createdAt;
    }
}
