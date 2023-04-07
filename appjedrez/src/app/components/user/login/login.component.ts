import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validate-form.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'bi bi-eye-slash-fill';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Send obj to database
    } else {
      console.log('El form no es válido');

      //tirar error usando un toast y con campos requeridos
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Tu form es inválido');
    }
  }
}
