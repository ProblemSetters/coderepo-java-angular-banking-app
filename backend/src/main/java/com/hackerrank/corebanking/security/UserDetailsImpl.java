package com.hackerrank.corebanking.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackerrank.corebanking.model.Account;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  @JsonIgnore
  private String password;

  private boolean enabled;

  private Collection<? extends GrantedAuthority> authorities;

  public static UserDetailsImpl build(Account user) {
    Set<SimpleGrantedAuthority> roles = user.getRoles()
      .stream()
      .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
      .collect(Collectors.toSet());

    return UserDetailsImpl.builder()
      .id(user.getAccountId())
      .username(user.getEmailAddress())
      .password(user.getPassword())
      .enabled(!user.isDeleted())
      .authorities(roles)
      .build();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }
}