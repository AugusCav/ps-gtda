import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  fullName: string = '';
  idUsuario: string | null = '';

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('idUsuario');
    
  }
}
