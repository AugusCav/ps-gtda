import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  idUser: string = '';
  fullName: string = '';
  role: string = '';
  imgUrl: string = 'https://via.placeholder.com/100x100';

  constructor(private auth: AuthService, private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.getDatos();

    this.auth.getFotoPerfil(this.idUser).subscribe({
      next: (res) => {
        this.imgUrl = `data:image/jpeg;base64,${res}`;
      },
      error: (err) => {
        console.error('Error al obtener la foto de perfil');
      },
    });
  }

  logout() {
    this.auth.logout();
  }

  getDatos() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
      this.auth.id = this.idUser;
    });

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
      this.auth.role = this.role;
    });
  }
}
