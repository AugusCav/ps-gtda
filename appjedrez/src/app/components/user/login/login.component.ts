import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userStore: UserStoreService
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
}
