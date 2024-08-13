import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

@Component({
  selector: "apply-loan",
  templateUrl: "./apply-loan.component.html",
  styleUrls: ["./apply-loan.component.scss"],
})
export class ApplyLoanComponent {
  loanForm: FormGroup;
  submittedApplicants: any[] = [];

  // List of states to populate the dropdown
  states: string[] = [
    "Punjab",
    "Haryana",
    "Uttar Pradesh",
    "Delhi",
    "Rajasthan",
  ];
  loanTypes: string[] = [
    "Home Loan",
    "Car Loan",
    "Personal Loan",
    "Education Loan",
  ];
  genderType: string[] = ["Female", "Male", "Other"];

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      applicants: this.fb.array([this.createApplicantGroup()]), // Start with one applicant group
    });
  }

  // Getter for applicants FormArray
  get applicants() {
    return this.loanForm.get("applicants") as FormArray;
  }

  // Function to create a new form group for an applicant
  createApplicantGroup() {
    return this.fb.group({
      name: ["", Validators.required],
      age: ["", [Validators.required, Validators.min(0)]],
      number: ["", Validators.required],
      aadhar: ["", Validators.required],
      pan: ["", [Validators.required, panValidator()]], // Added PAN validation
      email: ["", [Validators.required, Validators.email]], // Email validation
      birthDay: [
        "",
        [Validators.required, Validators.min(1), Validators.max(31)],
      ], // Day validation
      birthMonth: [
        "",
        [Validators.required, Validators.min(1), Validators.max(12)],
      ], // Month validation
      birthYear: [
        "",
        [Validators.required, Validators.min(1900), Validators.max(2099)],
      ], // Year validation
      streetAddress: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      code: ["", Validators.required],
      loanType: ["", Validators.required],
      gender: ["", Validators.required],
      comments: [""],
    });
  }

  onSubmit() {
    if (this.loanForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    // Push the form values to submittedApplicants array
    this.submittedApplicants.push(...this.loanForm.value.applicants);

    // Reset the form and maintain one empty applicant group
    this.applicants.clear(); // Clear all applicant groups
    this.applicants.push(this.createApplicantGroup()); // Add a fresh applicant group

    this.loanForm.markAsPristine();
    this.loanForm.markAsUntouched();
  }

  // Function to mark all form controls as touched
  private markAllAsTouched() {
    this.loanForm.markAllAsTouched();
    this.applicants.controls.forEach((applicant) => {
      (applicant as FormGroup).markAllAsTouched();
    });
  }
}

// Validator function to ensure the PAN number format
export function panValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // PAN number format: typically 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isValid = panPattern.test(value);
    return isValid ? null : { invalidPan: true };
  };
}
