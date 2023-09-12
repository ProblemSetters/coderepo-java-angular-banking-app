package com.hackerrank.corebanking.model;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class AccountDTO {
  private Long accountId;
  private String firstName;
  private String lastName;
  private Date dob;
  private String gender;
  private String address;
  private String city;
  private String emailAddress;
  private Double balance = 2434.76;

  private Integer totalTransactions;
  private Integer totalCards;
}
