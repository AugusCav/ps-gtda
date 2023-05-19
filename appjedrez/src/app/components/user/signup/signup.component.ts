import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  type1: string = 'password';
  type2: string = 'password';
  isText: boolean = false;
  isText2: boolean = false;
  eyeIcon: string = 'bi bi-eye-slash-fill';
  eyeIcon2: string = 'bi bi-eye-slash-fill';
  signupForm!: FormGroup;
  passValidado: boolean = false;
  clave2: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nombres: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      telefono: ['', Validators.required],
      idRolUsuario: [3],
    });
  }

  ocultarMostrarPass1() {
    this.isText = !this.isText;

    this.isText
      ? (this.eyeIcon = 'bi-eye-fill')
      : (this.eyeIcon = 'bi-eye-slash-fill');

    this.isText ? (this.type1 = 'text') : (this.type1 = 'password');
  }
  ocultarMostrarPass2() {
    this.isText2 = !this.isText2;

    this.isText2
      ? (this.eyeIcon2 = 'bi-eye-fill')
      : (this.eyeIcon2 = 'bi-eye-slash-fill');

    this.isText2 ? (this.type2 = 'text') : (this.type2 = 'password');
  }

  onSignup() {
    if (this.signupForm.valid) {
      if (this.signupForm.controls['clave'].value !== this.clave2) {
        this.passValidado = true;
        this.toastr.error('Datos inválidos', 'Error');
        return
      } else {
        this.passValidado = false;
      }
      //logica para el signup
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.router.navigate(['user/login']);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        },
      });
    } else {
      //tirar error
      ValidateForm.validateAllFormFields(this.signupForm);
      this.toastr.error('Datos inválidos', 'Error');
    }
  }
}
