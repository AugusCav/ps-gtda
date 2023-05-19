import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  constructor(private router: Router, private auth: AuthService) {}

  entrar() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user/dashboard']);
    } else {
      this.router.navigate(['/user/login']);
    }
  }
}
