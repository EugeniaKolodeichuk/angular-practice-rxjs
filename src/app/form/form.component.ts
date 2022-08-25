import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public maxDate: Date | undefined;
  public minDate: Date = new Date('1-1-1900');

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  public registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_ ]*$')]],
    dob: [''],
    password: ['', [Validators.pattern(/\S{6}/), Validators.pattern(/.*[A-Z].*/), Validators.pattern(/.*\d.*/), Validators.pattern(/.*[~!@#$%^&*].*/)]],
    confirmPassword: [''],
  },
  {
    validator: this.passwordMatchValidator()
  });

  public onInputChange(event: any) {
    const isDateValid = moment(event.target.value).year() > 1900;
    if (!isDateValid) {
        this.registrationForm.controls['dob'].setErrors({'invalid': true});
    } else {
      this.registrationForm.controls['dob'].setErrors(null);
    }
  }

  public passwordMatchValidator() {
		return (formGroup: FormGroup) => {
			const control = formGroup.controls['password'];
			const confirmControl = formGroup.controls['confirmPassword'];
			if (control.value !== confirmControl.value) {
        confirmControl.setErrors({'invalid': true});
			} else {
        confirmControl.setErrors(null);
			}
		};
	}
}
