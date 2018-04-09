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
  MatCheckboxModule, MatCardModule, MatExpansionModule, MatDividerModule, MatTabsModule, MatProgressSpinnerModule
} from '@angular/material';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';

import { CardService } from './services/card.service';
import { NavigationService } from './services/navigation.service';
import { EventService } from './services/event.service';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { DetailComponent } from './components/detail/detail.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DeckComponent } from './components/deck/deck.component';
import { TrunkComponent } from './components/trunk/trunk.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DeckListComponent } from './components/deck-list/deck-list.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAnwGKZseQQflRPEWCgOWs-VXkpwdda31A",
  authDomain: "gigo-byte.firebaseapp.com",
  databaseURL: "https://gigo-byte.firebaseio.com",
  projectId: "gigo-byte",
  storageBucket: "gigo-byte.appspot.com",
  messagingSenderId: "714692351263"
};


const appRoutes: Routes = [

  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'cards/:stash', component: CardsComponent },
  // { path: 'deck', component: DeckComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    ThumbnailComponent,
    DetailComponent,
    SidenavComponent,
    DeckComponent,
    TrunkComponent,
    DeckListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,

    MatButtonModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatSliderModule, MatPaginatorModule, MatInputModule, MatFormFieldModule,
    MatCheckboxModule, MatCardModule, MatExpansionModule, MatDividerModule, MatTabsModule, MatProgressSpinnerModule,


    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CardService, NavigationService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
