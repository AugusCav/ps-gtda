import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validate-form.helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'bi bi-eye-slash-fill';
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ocultarMostrarPass() {
    this.isText = !this.isText;

    this.isText
      ? (this.eyeIcon = 'bi-eye-fill')
      : (this.eyeIcon = 'bi-eye-slash-fill');

    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      //logica para el signup
    } else {
      console.log('El form no es válido');

      //tirar error
      ValidateForm.validateAllFormFields(this.signupForm);
      alert('Tu form es inválido');
    }
  }
}
