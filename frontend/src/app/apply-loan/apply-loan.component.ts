import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { applicantFields } from "./form-fields.helper"; // Import the helper file

@Component({
  selector: "apply-loan",
  templateUrl: "./apply-loan.component.html",
  styleUrls: ["./apply-loan.component.scss"],
})
export class ApplyLoanComponent implements AfterViewInit {
  loanForm: FormGroup;
  submittedApplicants: any[] = [];
  currentIndex: number = 0; // Track the current field index

  @ViewChild("stepperContainer") stepperContainer!: ElementRef<HTMLDivElement>;

  // List of states, loan types, and gender types to populate the dropdowns
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

  // Expose applicantFields to the template and ensure it's properly typed
  public applicantFields = applicantFields;

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      applicants: this.fb.array([this.createApplicantGroup()]), // Start with one applicant group
      acceptTerms: [false, Validators.requiredTrue], // Initialize checkbox with validation
    });
  }

  ngAfterViewInit() {
    this.focusCurrent();
  }

  // Getter for applicants FormArray
  get applicants() {
    return this.loanForm.get("applicants") as FormArray;
  }

  // Function to create a new form group for an applicant
  createApplicantGroup() {
    const group: { [key: string]: any } = {};
    this.applicantFields.forEach((field) => {
      const validators = this.getValidators(field.validators || []); // Default to empty array if validators is undefined
      group[field.name] = ["", validators];
    });
    return this.fb.group(group);
  }

  // Function to get validators based on configuration
  getValidators(validators: string[]): ValidatorFn[] {
    const formValidators: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === "required") formValidators.push(Validators.required);
      else if (validator.startsWith("min:"))
        formValidators.push(Validators.min(+validator.split(":")[1]));
      else if (validator.startsWith("max:"))
        formValidators.push(Validators.max(+validator.split(":")[1]));
      else if (validator === "email") formValidators.push(Validators.email);
      else if (validator === "custom:panValidator")
        formValidators.push(panValidator());
    });
    return formValidators;
  }

  // Method to dynamically get the options based on the field
  getFieldOptions(field: any): string[] {
    if (field.options === "states") {
      return this.states;
    } else if (field.options === "loanTypes") {
      return this.loanTypes;
    } else if (field.options === "genderType") {
      return this.genderType;
    } else if (Array.isArray(field.options)) {
      return field.options;
    }
    return [];
  }

  // Method to navigate to the next input field
  focusNext() {
    const fields = Array.from(
      this.stepperContainer.nativeElement.querySelectorAll(
        "input, textarea, select"
      )
    );
    if (this.currentIndex < fields.length - 1) {
      this.currentIndex++;
      this.focusCurrent();
    }
  }

  // Method to navigate to the previous input field
  focusPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.focusCurrent();
    }
  }

  // Method to focus the current field based on the currentIndex
  private focusCurrent() {
    if (this.stepperContainer) {
      const fields = Array.from(
        this.stepperContainer.nativeElement.querySelectorAll(
          "input, textarea, select"
        )
      );
      if (fields[this.currentIndex]) {
        (fields[this.currentIndex] as HTMLElement).focus();
      }
    }
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
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isValid = panPattern.test(value);
    return isValid ? null : { invalidPan: true };
  };
}



