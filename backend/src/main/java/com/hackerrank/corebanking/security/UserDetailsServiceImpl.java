package com.hackerrank.corebanking.security;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account user = accountRepository.findByEmailAddress(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email address: " + username));

        return UserDetailsImpl.build(user);
    }
}
