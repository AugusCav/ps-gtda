import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

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
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  ocultarMostrarPass() {
    this.isText = !this.isText;

    this.isText
      ? (this.eyeIcon = 'bi-eye-fill')
      : (this.eyeIcon = 'bi-eye-slash-fill');

    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      //enviar obj a la bd
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayLoad = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.role);
          this.userStore.setIdForStore(tokenPayLoad.nameid);
          this.toastr.success(res.message, 'Éxito', {
            timeOut: 1500,
          });
          this.router.navigate(['user/dashboard']);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
        },
      });
    } else {
      //tirar error usando un toast y con campos requeridos
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toastr.error('Datos inválidos', 'Error');
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.resetService
        .sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (res) => {
            this.toastr.success('Email enviado', 'Éxito');
            this.resetPasswordEmail = '';
            const buttonRef = document.getElementById('closeBtn');
            buttonRef?.click();
          },
          error: (err) => {
            this.toastr.error('Hubo algun error', 'Error');
          },
        });
    }
  }
}
