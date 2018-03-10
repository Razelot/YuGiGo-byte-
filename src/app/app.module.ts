import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule, MatSidenavModule, MatToolbarModule, MatGridListModule,
  MatSliderModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatCardModule, MatExpansionModule, MatDividerModule
} from '@angular/material';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';

import { CardService } from './services/card.service';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  // { path: 'deck', component: DeckComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    HttpClientModule,
    FormsModule,

    MatButtonModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatSliderModule, MatPaginatorModule, MatInputModule, MatFormFieldModule,
    MatCheckboxModule, MatCardModule, MatExpansionModule, MatDividerModule,


    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
