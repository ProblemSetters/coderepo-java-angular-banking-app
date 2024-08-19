import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { ApplyLoanComponent } from "src/app/apply-loan/apply-loan.component";
import { applicantFields } from "src/app/apply-loan/form-fields.helper";

describe("ApplyLoanComponent", () => {
  let component: ApplyLoanComponent;
  let fixture: ComponentFixture<ApplyLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyLoanComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should initialize the form with dynamic controls", () => {
    component.ngOnInit();
    applicantFields.forEach((field: any) => {
      expect(component.dynamicForm.contains(field.name)).toBe(true);
    });
  });

  it("should display error message for required field", () => {
    const fieldName = applicantFields[0].name; // Assuming first field is required
    const control = component.dynamicForm.get(fieldName);
    control?.markAsTouched();
    control?.setErrors({ required: true });
    const errorMessage = component.getErrrorMessage(fieldName);
    expect(errorMessage).toBe("This field is required");
  });

  it("should return null for valid PAN number", () => {
    const validPanControl = { value: "ABCDE1234F" };
    const validationResponse = component.panValidator(validPanControl);
    expect(validationResponse).toBeNull();
  });

  it("should return error for invalid PAN number", () => {
    const invalidPanControl = { value: "ABC12345X" };
    const validationResponse = component.panValidator(invalidPanControl);
    expect(validationResponse).toEqual({ panInvalid: true });
  });

  it("should create steps correctly based on categories", () => {
    component.createSteps();
    expect(component.steps.length).toBe(component.categories.length);
    component.categories.forEach((category: any, index: number) => {
      expect(component.steps[index].category).toBe(category);
    });
  });

  it("should move to the next step when valid", () => {
    spyOn(component, "isStepComplete").and.returnValue(true);
    const initialStep = component.currentStep;
    component.nextStep();
    expect(component.currentStep).toBe(initialStep + 1);
  });

  it("should not move to the next step when invalid", () => {
    spyOn(component, "isStepComplete").and.returnValue(false);
    const initialStep = component.currentStep;
    component.nextStep();
    expect(component.currentStep).toBe(initialStep);
  });

  it("should move to the previous step", () => {
    component.currentStep = 1; // Set to step 1
    component.previousStep();
    expect(component.currentStep).toBe(0); // Should move to step 0
  });

  it("should submit the form if valid", () => {
    spyOn(console, "log");
    component.dynamicForm.setValue({
      fname: "John Doe",
      lname: "Smith",
      aadhar: "123456789012",
      loanType: "Car Loan",
      number: "1234567890",
      email: "john@example.com",
      pan: "ABCDE1234F",
      state: "Andhra Pradesh",
      city: "Hyderabad",
      streetAddress: "123, Example Street",
      code: "123456",
      gender: "male",
      birth: "1990-01-01",
      comments: "This is a test comment",
      acceptTerms: true,
    });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith(component.dynamicForm.value);
  });

  it("should not submit the form if invalid", () => {
    spyOn(console, "log");
    component.dynamicForm.setValue({
      // Invalid form data
      fname: "",
      lname: "Smith",
      aadhar: "123456789012",
      loanType: "Car Loan",
      number: "1234567890",
      email: "johnexample.com",
      pan: "ABCDE1234F",
      state: "Andhra Pradesh",
      city: "Hyderabad",
      streetAddress: "123, Example Street",
      code: "123456",
      gender: "male",
      birth: "1990-01-01",
      comments: "This is a test comment",
      acceptTerms: true,
    });
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });

  it("should return correct options for loan types", () => {
    const options = component.getOptions("loanTypes");
    expect(options).toEqual(["Car Loan", "Home Loan", "Personal Loan"]);
  });

  it("should return correct options for states", () => {
    const options = component.getOptions("states");
    expect(options).toEqual([
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
    ]);
  });
});
