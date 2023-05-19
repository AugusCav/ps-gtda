import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private role: string = '';

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.warning('Inicie sesión para acceder', 'Advertencia');
      this.router.navigate(['/user/login']);
      return false;
    }
  }

  canActivateLog(): boolean {
    if (!this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.warning('Cierre sesión antes', 'Advertencia');
      this.router.navigate(['/user/dashboard']);
      return false;
    }
  }

  canActivateOrg(): boolean {
    if (this.auth.isLoggedIn()) {
      this.userStore.getRoleFromStore().subscribe((val) => {
        let roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });
      console.log(this.role);
      if (this.role == 'Organizador') {
        return true;
      } else {
        this.toastr.warning('Debe ser organizador para acceder', 'Advertencia');
        return false;
      }
    } else {
      this.toastr.warning('Inicie sesión para acceder', 'Advertencia');
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
