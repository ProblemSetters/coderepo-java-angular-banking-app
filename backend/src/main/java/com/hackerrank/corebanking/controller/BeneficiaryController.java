package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.service.AccountService;
import com.hackerrank.corebanking.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

  @GetMapping("/beneficiary-ids")
  public ResponseEntity<List<Map<String, String>>> getAllBeneficiaryIds() {
    List<Long> ids = beneficiaryService.getAllBeneficiaryAccountIds();
    List<Map<String, String>> response = ids.stream()
        .map(id -> Map.of("beneficiary", id.toString(), "status", "valid"))
        .collect(Collectors.toList());

    // Adding extra beneficiaries with invalid status
    response.add(Map.of("beneficiary", "1014113163", "status", "invalid"));
    response.add(Map.of("beneficiary", "1012913177", "status", "invalid"));
    response.add(Map.of("beneficiary", "1014229809", "status", "invalid"));
    response.add(Map.of("beneficiary", "1292913737", "status", "invalid"));
    response.add(Map.of("beneficiary", "1013329855", "status", "invalid"));
    response.add(Map.of("beneficiary", "1257213780", "status", "invalid"));

    return ResponseEntity.ok(response);
  }
}
