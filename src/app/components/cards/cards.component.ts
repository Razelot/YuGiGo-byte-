import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSlider } from '@angular/material';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs/Subscription';

import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {

  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  constructor(public api: CardService, public navi: NavigationService) { }

  ngOnInit() { }

}