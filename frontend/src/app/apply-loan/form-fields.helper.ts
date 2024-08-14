import { Validators } from "@angular/forms";

export const applicantFields = [
  { type: 'text', name: 'name', placeholder: 'Enter name', label: 'Name', validators: ['required'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'number', name: 'age', placeholder: 'Enter age', label: 'Age', validators: ['required', 'min:0'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'number', name: 'number', placeholder: 'Enter phone number', label: 'Phone number', validators: ['required'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'email', name: 'email', placeholder: 'Enter email address', label: 'E-mail', validators: ['required', 'email'],class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'number', name: 'aadhar', placeholder: 'Enter Aadhar card number', label: 'Aadhaar number', validators: ['required'],class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'text', name: 'pan', placeholder: 'Enter PAN card number', label: 'PAN number', validators: ['required', 'custom:panValidator'], class: 'w-full md:w-1/2 px-2 mb-4'},
  { type: 'select', name: 'loanType', placeholder: 'Select Loan Type', label: 'Loan type', validators: ['required'], options: 'loanTypes', class: 'w-full px-2 mb-4' },
  { type: 'text', name: 'streetAddress', placeholder: 'Enter street address', label: 'Street Address', validators: ['required'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'text', name: 'city', placeholder: 'Enter your city', label: 'City', validators: ['required'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'select', name: 'state', placeholder: 'Select your state', label: 'State', validators: ['required'], options: 'states', class: 'w-full md:w-1/2 px-2 mb-4'},
  { type: 'number', name: 'code', placeholder: 'Enter zip code', label: 'Zip/postal code', validators: ['required'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'radio', name: 'gender', placeholder: 'Select gender', label: 'Gender', validators: ['required'], options: ['Male', 'Female', 'Other'], class: 'w-full px-2 mb-4' },
  { type: 'number', name: 'birthDay', placeholder: 'DD', label: 'Birth Date', validators: ['required', 'min:1', 'max:31'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'number', name: 'birthMonth', placeholder: 'MM', label: 'Birth Month', validators: ['required', 'min:1', 'max:12'], class: 'w-full md:w-1/2 px-2 mb-4' },
  { type: 'number', name: 'birthYear', placeholder: 'YYYY', label: 'Birth Year', validators: ['required', 'min:1900', 'max:2099'], class: 'w-full px-2 mb-4' },
  { type: 'textarea', name: 'comments', placeholder: 'Enter any additional comments here', label: 'Additional Comments', validators: [], class: 'w-full px-2 mb-4' },
  { type: 'checkbox', name: 'acceptTerms', class: 'form-checkbox w-full px-2 mb-4' }, // Fixed this to include class
];


