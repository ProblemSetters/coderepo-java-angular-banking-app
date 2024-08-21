package com.hackerrank.corebanking.controller.task9;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.JwtToken;
import com.hackerrank.corebanking.model.Role;
import com.hackerrank.corebanking.repository.AccountRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureMockMvc
class TransactionControllerTest {

    ObjectMapper om = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AccountRepository accountRepository;

    @Test
    void shouldAllowAdminToGetTransactionOfAnUserAccount() throws Exception {
        createAccount(Account.builder()
                .emailAddress("admin@shouldAllowAdminToGetTransactionOfAnUserAccount.com")
                .password("admin#password123")
                .roles(Set.of(new Role(1L, "ADMIN")))
                .build());
        Account normalUserAccount = createAccount(Account.builder()
                .emailAddress("user@shouldAllowAdminToGetTransactionOfAnUserAccount.com")
                .password("user#password123")
                .build());
        JwtToken adminJwt = login("admin@shouldAllowAdminToGetTransactionOfAnUserAccount.com", "admin#password123");

        mockMvc.perform(get(
                                "/api/core-banking/transaction/transactionHistory/accounts/{accountId}?fromDate={fromDate}&toDate={fromDate}",
                                normalUserAccount.getAccountId(),
                                "2024-06-29",
                                "2024-07-29"
                        )
                                .accept(MediaType.APPLICATION_JSON)
                                .header("Authorization", "%s %s".formatted(adminJwt.getName(), adminJwt.getValue()))
                )
                .andExpect(status().isOk());
    }

    @Test
    void shouldNotAllowUser1ToGetTransactionOfAnotherAccount() throws Exception {
        createAccount(Account.builder()
                .emailAddress("user1@shouldNotAllowUser1ToGetTransactionOfAnotherAccount.com")
                .password("user1#password123")
                .build());
        Account user2Account = createAccount(Account.builder()
                .emailAddress("user2@shouldNotAllowUser1ToGetTransactionOfAnotherAccount.com")
                .password("user2#password123")
                .build());

        JwtToken user1Jwt = login("user1@shouldNotAllowUser1ToGetTransactionOfAnotherAccount.com", "user1#password123");

        mockMvc.perform(get(
                                "/api/core-banking/transaction/transactionHistory/accounts/{accountId}?fromDate={fromDate}&toDate={fromDate}",
                                user2Account.getAccountId(),
                                "2024-06-29",
                                "2024-07-29"
                        )
                                .accept(MediaType.APPLICATION_JSON)
                                .header("Authorization", "%s %s".formatted(user1Jwt.getName(), user1Jwt.getValue()))
                )
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldSoftDeleteAccountAndUserShouldNotBeAbleToLogin() throws Exception {
        createAccount(Account.builder()
                .emailAddress("admin@shouldSoftDeleteAccountAndUserShouldNotBeAbleToLogin.com")
                .password("admin#password123")
                .roles(Set.of(new Role(1L, "ADMIN")))
                .build());
        Account normalUserAccount = createAccount(Account.builder()
                .emailAddress("user@shouldSoftDeleteAccountAndUserShouldNotBeAbleToLogin.com")
                .password("user#password123")
                .build());
        JwtToken adminJwt = login("admin@shouldSoftDeleteAccountAndUserShouldNotBeAbleToLogin.com", "admin#password123");

        mockMvc.perform(delete("/api/core-banking/account/{accountId}?softDelete=true", normalUserAccount.getAccountId())
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", "%s %s".formatted(adminJwt.getName(), adminJwt.getValue()))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountId", equalTo(normalUserAccount.getAccountId().intValue())))
                .andExpect(jsonPath("$.deleted", equalTo(true)))
                .andExpect(jsonPath("$.deletedAt", notNullValue()));
        mockMvc.perform(post("/api/core-banking/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsBytes(Map.of("emailAddress", "user@example.com", "password", "user#password123"))))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldNotAllowNormalUserToDeleteAnAccount() throws Exception {
        createAccount(Account.builder()
                .emailAddress("user1@shouldNotAllowNormalUserToDeleteAnAccount.com")
                .password("user1#password123")
                .build());
        Account user2 = createAccount(Account.builder()
                .emailAddress("user2@shouldNotAllowNormalUserToDeleteAnAccount.com")
                .password("user2#password123")
                .build());
        JwtToken user1Jwt = login("user1@shouldNotAllowNormalUserToDeleteAnAccount.com", "user1#password123");

        mockMvc.perform(delete("/api/core-banking/account/{accountId}?softDelete=true", user2.getAccountId())
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", "%s %s".formatted(user1Jwt.getName(), user1Jwt.getValue()))
                )
                .andExpect(status().isForbidden());
        mockMvc.perform(delete("/api/core-banking/account/{accountId}", user2.getAccountId())
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", "%s %s".formatted(user1Jwt.getName(), user1Jwt.getValue()))
                )
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldNotAllowUser1ToGetAnyAccount() throws Exception {
        createAccount(Account.builder()
                .emailAddress("user1@shouldNotAllowUser1ToGetAnyAccount.com")
                .password("user1#password123")
                .build());
        Account user2Account = createAccount(Account.builder()
                .emailAddress("user2@shouldNotAllowUser1ToGetAnyAccount.com")
                .password("user2#password123")
                .build());

        JwtToken user1Jwt = login("user1@shouldNotAllowUser1ToGetAnyAccount.com", "user1#password123");

        mockMvc.perform(get("/api/core-banking/account/{accountId}", user2Account.getAccountId())
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", "%s %s".formatted(user1Jwt.getName(), user1Jwt.getValue()))
                )
                .andExpect(status().isForbidden());
    }

    private Account createAccount(Account request) throws Exception {
        String adminUserMvcResult = mockMvc.perform(post("/api/core-banking/account")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsBytes(request)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();
        return om.readValue(adminUserMvcResult, Account.class);
    }

    private JwtToken login(String email, String password) throws Exception {
        String adminUserMvcResult = mockMvc.perform(post("/api/core-banking/auth/signin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsBytes(Map.of("emailAddress", email, "password", password))))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        return om.readValue(adminUserMvcResult, JwtToken.class);
    }
}