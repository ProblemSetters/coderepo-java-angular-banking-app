package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/core-banking/beneficiary")
public class BeneficiaryController {
  private final BeneficiaryService beneficiaryService;

  @Autowired
  public BeneficiaryController(BeneficiaryService beneficiaryService, AccountService accountService) {
    this.beneficiaryService = beneficiaryService;
  }

  //create new card
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Beneficiary createNewBeneficiary(@RequestBody Beneficiary beneficiary) {
    return beneficiaryService.createNewBeneficiary(beneficiary);
  }

  //get all beneficiaries of an account
  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<Beneficiary> getAllCards() {
    return beneficiaryService.getAllBeneficiaries();
  }

  //delete beneficiary
  @DeleteMapping("/{beneficiaryId}")
  @ResponseStatus(HttpStatus.OK)
  public void deleteCardByCardNumber(@PathVariable Long beneficiaryId) {
    beneficiaryService.deleteBeneficiaryById(beneficiaryId);
  }
}
