import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  idUser: string | null = '';
  fullName: string = '';
  role: string = '';

  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDatos();
  }

  logout() {
    this.auth.logout();
  }

  getDatos() {
    this.idUser = this.route.snapshot.paramMap.get('idUsuario');
    this.auth.id = this.idUser;
    this.auth.getById(this.idUser).subscribe({
      next: (res) => {
        this.fullName = res.nombres + ' ' + res.apellido;
        this.role = res.rol.rol
      },
    });
  }
}
