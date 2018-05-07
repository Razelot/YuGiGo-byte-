import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSlider } from '@angular/material';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { Subscription } from 'rxjs/Subscription';

import { forEach } from '@angular/router/src/utils/collection';

import { NavigationService } from '../../services/navigation.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {

  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  constructor(public api: CardService, public navi: NavigationService, private ar: ActivatedRoute, private location: Location) { }

  ngOnInit() {

    if (this.ar.snapshot.params.stash == 'deck') {
      this.navi.view = 1;
    }else {
      this.navi.view = 0;
      this.location.replaceState("/cards/trunk");
    }

    // var self = this;

    // window.addEventListener('resize', () => {
    //   self.navi.updateCardGridCols();
    // }, true);

  }

}