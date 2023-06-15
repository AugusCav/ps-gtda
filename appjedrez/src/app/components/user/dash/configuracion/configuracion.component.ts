import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  userForm!: FormGroup;
  user: Usuario = {} as Usuario;
  idUser: string | null = '';
  archivoSeleccionado: File = {} as File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    this.userForm = this.fb.group({
      id: [this.idUser],
      nombreUsuario: ['', Validators.required],
      nombres: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      elo: [''],
    });

    if (this.idUser !== null) {
      this.auth.getById(this.idUser).subscribe({
        next: (res) => {
          this.userForm.patchValue(res);
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });
    } else {
      alert('Ningún torneo seleccionado');
    }
  }

  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  actualizar() {
    if (this.userForm.valid) {
      const formData: FormData = new FormData();
      formData.append('id', this.userForm.get('id')?.value);
      formData.append(
        'nombreUsuario',
        this.userForm.get('nombreUsuario')?.value
      );
      formData.append('nombres', this.userForm.get('nombres')?.value);
      formData.append('apellido', this.userForm.get('apellido')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('telefono', this.userForm.get('telefono')?.value);
      formData.append('elo', this.userForm.get('elo')?.value);
      formData.append('fotoPerfil', this.archivoSeleccionado);

      this.auth.updateUser(formData).subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (err) => {
          alert(err.message);
        },
      });
    } else {
      console.log('El form no es válido');

      //tirar error
      ValidateForm.validateAllFormFields(this.userForm);
    }
  }
}
