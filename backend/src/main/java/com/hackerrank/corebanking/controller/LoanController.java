package com.hackerrank.corebanking.controller;

import com.hackerrank.corebanking.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/accept/{loanId}")
    public ResponseEntity<String> acceptLoan(@PathVariable Long loanId) {
        try {
            loanService.acceptLoan(loanId);
            return new ResponseEntity<>("Loan accepted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to accept loan: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reject/{loanId}")
    public ResponseEntity<String> rejectLoan(@PathVariable Long loanId) {
        try {
            loanService.rejectLoan(loanId);
            return new ResponseEntity<>("Loan rejected successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to reject loan: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
