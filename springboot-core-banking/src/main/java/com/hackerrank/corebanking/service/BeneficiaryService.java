package com.hackerrank.corebanking.service;

import com.hackerrank.corebanking.model.Account;
import com.hackerrank.corebanking.model.Beneficiary;
import com.hackerrank.corebanking.repository.BeneficiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeneficiaryService {
  private final BeneficiaryRepository beneficiaryRepository;
  private final AccountService accountService;

  @Autowired
  BeneficiaryService(BeneficiaryRepository beneficiaryRepository, AccountService accountService) {
    this.beneficiaryRepository = beneficiaryRepository;
    this.accountService = accountService;
  }


  public Beneficiary createNewBeneficiary(Beneficiary beneficiary) {
    if (beneficiary.getId() != null) {
      throw new IllegalArgumentException("The beneficiaryId must not be provided when creating a new beneficiary.");
    }

    return beneficiaryRepository.save(beneficiary);
  }

  public List<Beneficiary> getAllBeneficiaries() {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountService.getAccountByEmailAddress(userDetails.getUsername());
    return beneficiaryRepository.findBeneficiariesByPayerId(account.getAccountId());

  }

  public void deleteBeneficiaryById(Long beneficiaryId) {
    beneficiaryRepository.deleteById(beneficiaryId);
  }
}
