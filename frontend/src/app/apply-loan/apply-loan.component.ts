import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { applicantFields, FormField } from "./form-fields.helper";

@Component({
  selector: "apply-loan",
  templateUrl: "./apply-loan.component.html",
  styleUrls: ["./apply-loan.component.scss"],
})
export class ApplyLoanComponent {
  dynamicForm!: FormGroup;
  applicantFields = applicantFields;
  steps: any = [];
  currentStep = 0;
  categories = ["Personal Info", "Contact Info", "Loan Details"];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({});
    this.createFormControls();
    this.createSteps();
  }

  createFormControls() {
    this.applicantFields.forEach((field) => {
      const validators = this.getValidators(field.validators);
      this.dynamicForm.addControl(field.name, this.fb.control("", validators));
    });
  }

  getErrrorMessage(fieldName: string) {
    const control = this.dynamicForm.get(fieldName);
    if (control?.hasError("required")) {
      return "This field is required";
    }
    if (control?.hasError("email")) {
      return "Enter a valid email address";
    }
    if (control?.hasError("min")) {
      return "Enter a valid number";
    }
    if (control?.hasError("panInvalid")) {
      return "Enter a valid PAN number";
    }
    return "";
  }

  createSteps() {
    const stepGroups: any = {};
    this.applicantFields.forEach((field) => {
      if (!stepGroups[field.category]) {
        stepGroups[field.category] = [];
      }
      stepGroups[field.category].push(field);
    });

    this.steps = this.categories.map((category) => ({
      category: category,
      fields: stepGroups[category] || [],
    }));
  }

  getValidators(validatorNames: string[]) {
    const validators: any = [];
    validatorNames?.forEach((name) => {
      if (name === "required") validators.push(Validators.required);
      if (name.startsWith("min:")) {
        const value = parseInt(name.split(":")[1], 10);
        validators.push(Validators.min(value));
      }
      if (name === "email") validators.push(Validators.email);
      if (name === "custom:panValidator") validators.push(this.panValidator);
    });
    return validators;
  }

  panValidator(control: any) {
    const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // Example pattern for PAN number
    return pattern.test(control.value) ? null : { panInvalid: true };
  }

  nextStep() {
    if (
      this.currentStep < this.steps.length - 1 &&
      this.isStepComplete(this.currentStep)
    ) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isStepComplete(stepIndex: number): boolean {
    const stepFields: FormField[] = this.steps[stepIndex].fields;
    return stepFields.every((field) => this.dynamicForm.get(field.name)?.valid);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
    }
  }
  getOptions(optionType: string) {
    if (optionType === "loanTypes") {
      return ["Car Loan", "Home Loan", "Personal Loan"]; // Example options
    }
    if (optionType === "states") {
      return [ "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh","Goa", "Gujarat","Haryana","Himachal Pradesh"]; // Example options
    }
    return [];
  }
  getJson(value: any) {
    return JSON.stringify(value, null, 2);
  }
}
