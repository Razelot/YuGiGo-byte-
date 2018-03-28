import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { EventService } from './services/event.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  @ViewChild('sidenav') sidenav: MatSidenav;

  eventSubscription: Subscription;

  constructor(public eventService: EventService) { }

  ngOnInit(){

    this.eventSubscription = this.eventService.changeEmitted$.subscribe((event) => {
      if(event.target == 'app-component' && event.function == 'toggleSideNav'){
        this.toggleSideNav();
      }
    });

  }

  ngOnDestroy(){
    this.eventSubscription.unsubscribe();
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
