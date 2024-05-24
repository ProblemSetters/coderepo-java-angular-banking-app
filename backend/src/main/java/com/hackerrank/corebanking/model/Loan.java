package com.hackerrank.corebanking.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
public class Loan implements Serializable {
    @Id
    public Long id; 
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreated;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date lastUpdated;
    public String applicantName; 
    public double amount; 
    public String purpose; 
    public LoanStatus status; 
}
