package com.hackerrank.corebanking.service;

import org.springframework.stereotype.Service;
import com.hackerrank.corebanking.model.Loan;
import com.hackerrank.corebanking.model.LoanStatus;
import com.hackerrank.corebanking.repository.LoanRepository;
import java.util.Optional;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public void acceptLoan(Long loanId) {
        Optional<Loan> optionalLoan = loanRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loan loan = optionalLoan.get();
            loan.setStatus(LoanStatus.ACCEPTED);
            loanRepository.save(loan);
        } else {
            throw new IllegalArgumentException("Loan not found with ID: " + loanId);
        }
    }

    public void rejectLoan(Long loanId) {
        Optional<Loan> optionalLoan = loanRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loan loan = optionalLoan.get();
            loan.setStatus((LoanStatus) (Object) 3);
            loanRepository.save(loan);
        } else {
            throw new IllegalArgumentException("Loan not found with ID: " + loanId);
        }
    }
}
