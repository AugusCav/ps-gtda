import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PartidaPipe } from 'src/app/pipes/partida.pipe';

@NgModule({
  declarations: [NavbarComponent, PartidaPipe],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, PartidaPipe],
})
export class SharedModule {}
