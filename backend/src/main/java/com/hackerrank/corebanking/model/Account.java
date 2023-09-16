package com.hackerrank.corebanking.model;

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
public class Account implements Serializable {
  @TableGenerator(name = "ac_id_gen", table = "ac_id_gen", pkColumnName = "gen_name", valueColumnName = "gen_val", pkColumnValue = "gen_val", initialValue = 1111213169, allocationSize = 999)
  @Id
  @GeneratedValue(strategy = GenerationType.TABLE, generator = "ac_id_gen")
  private Long accountId;
  private String firstName;
  private String lastName;
  private Date dob;
  private String gender;
  private String address;
  private String city;
  @Column(unique = true)
  private String emailAddress;
  private Double balance = 2434.76;
  private String password;
}
