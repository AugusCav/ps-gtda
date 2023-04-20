import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './components/game/game.module';
import { UserModule } from './components/user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TorneoModule } from './components/torneo/torneo.module';

registerLocaleData(localeEs);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    UserModule,
    NgbModule,
    HttpClientModule,
    TorneoModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
