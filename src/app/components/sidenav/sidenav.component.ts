import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(public navi: NavigationService) { }

  ngOnInit() {
  }


  foo(){
    console.log('asda')

    console.log(this.navi.view);
  }

}
