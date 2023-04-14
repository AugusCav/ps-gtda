import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
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

  ocultarMostrarPass() {
    this.isText = !this.isText;

    this.isText
      ? (this.eyeIcon = 'bi-eye-fill')
      : (this.eyeIcon = 'bi-eye-slash-fill');

    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignup() {
    if (this.signupForm.valid) {
      //logica para el signup
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['user/login'])
        },
        error: (err) => {
          alert(err.message);
        },
      });
    } else {
      console.log('El form no es válido');

      //tirar error
      ValidateForm.validateAllFormFields(this.signupForm);
      alert('Tu form es inválido');
    }
  }
}
