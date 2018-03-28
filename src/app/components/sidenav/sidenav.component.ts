import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public navi: NavigationService, public eventService: EventService) { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.eventService.emitChange(
      {
        'target': 'app-component',
        'function': 'toggleSideNav'
      }
    );
  }

  SetView(viewId: Number){
    this.navi.setView(viewId);
    this.toggleSideNav();
  }

}
