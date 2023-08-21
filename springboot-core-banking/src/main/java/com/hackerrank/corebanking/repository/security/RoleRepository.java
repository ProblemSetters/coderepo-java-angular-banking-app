package com.hackerrank.corebanking.repository.security;

import com.hackerrank.corebanking.model.security.ERole;
import com.hackerrank.corebanking.model.security.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
