import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { NavigationService } from '../../services/navigation.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public navi: NavigationService, public api: CardService) { }

  ngOnInit() {
  }

}
