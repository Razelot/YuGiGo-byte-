import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { EventService } from './services/event.service';
import { Subscription } from 'rxjs/Subscription';

import { MediaMatcher } from '@angular/cdk/layout';

import { NavigationService } from './services/navigation.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  // @ViewChild('sidenav') sidenav: MatSidenav;

  // mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  // eventSubscription: Subscription;

  constructor(public navi: NavigationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.navi.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.navi.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){

  //   this.eventSubscription = this.eventService.changeEmitted$.subscribe((event) => {
  //     if(event.target == 'app-component' && event.function == 'toggleSideNav'){
  //       this.toggleSideNav();
  //     }
  //   });

  // }

  // ngOnDestroy(){
  //   this.eventSubscription.unsubscribe();
  // }

  // toggleSideNav() {
  //   this.sidenav.toggle();

  }
}
