package com.hackerrank.corebanking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.repository.AccountRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureMockMvc
class AccountControllerTest {
  ObjectMapper om = new ObjectMapper();
  @Autowired
  private MockMvc mockMvc;
  @Autowired
  private AccountRepository accountRepository;

  @Test
  public void testCreation() throws Exception {
    Account expectedRecord = Account.builder().emailAddress("test@gmail.com").build();
    Account actualRecord = om.readValue(mockMvc.perform(post("/api/core-banking/account")
                    .contentType("application/json")
                    .content(om.writeValueAsString(expectedRecord)))
            .andDo(print())
            .andExpect(jsonPath("$.id", greaterThan(0)))
            .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Account.class);

    Assertions.assertEquals(expectedRecord.getEmailAddress(), actualRecord.getEmailAddress());
  }
}