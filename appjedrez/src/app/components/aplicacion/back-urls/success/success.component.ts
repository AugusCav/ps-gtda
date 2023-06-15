import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  idUser: string = '';

  constructor(
    private auth: AuthService,
    private inscripcionService: InscripcionService,
    private userStore: UserStoreService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDatos();

    const usuario: Usuario = { id: this.idUser } as Usuario;
    this.inscripcionService.aprobarOrg(usuario).subscribe({
      next: () => {
        this.toastr.success('Inscripción aprobada', 'Éxito');

        setTimeout(() => {
          this.router.navigate(['/user/dashboard']);
        }, 5000);
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  getDatos() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
      this.auth.id = this.idUser;
    });
  }
}
