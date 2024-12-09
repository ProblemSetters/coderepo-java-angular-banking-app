package com.hackerrank.corebanking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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
  private boolean deleted = false;
  private Date deletedAt;
  private boolean locked = false;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_roles",
          joinColumns = @JoinColumn(name = "account_id"),
          inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
  @JsonManagedReference
  private Set<RecurringTransaction> recurringTransactions = new HashSet<>();
}