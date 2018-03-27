import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSlider } from '@angular/material';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs/Subscription';

import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-trunk',
  templateUrl: './trunk.component.html',
  styleUrls: ['./trunk.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrunkComponent implements OnInit {

  // Card Filter and Search
  query: string;

  attributes: boolean[];
  races: boolean[];

  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  constructor(public api: CardService, public navi: NavigationService) { }

  ngOnInit() {

    let self = this;

    this.clearFilter();

    this.cardSizeSlider.registerOnChange((value) => {
      this.navi.onCardSizeSliderChanged(value);
    });

  }

  searchCards() {

    this.api.loading = true;

    // Check filtered attributes
    let filterAttributes = [];
    for (let i = 0; i < this.attributes.length; i++) {
      if (this.attributes[i]) {
        filterAttributes.push(this.DEFINE_ATTRIBUTE[i]);
      }
    }

    let filterRaces = [];
    for (let i = 0; i < this.races.length; i++) {
      if (this.races[i]) {
        filterRaces.push(this.DEFINE_RACE[i]);
      }
    }

    this.api.searchCards(this.api.query, filterAttributes, filterRaces).subscribe(cards => {
      this.api.cards = cards;
      this.api.cardCount = cards.length;
      this.api.pageIndex = 0;
      this.api.setPage();
    });
  }

  onPageChange(event) {
    this.api.pageIndex = event.pageIndex;
    this.api.pageSize = event.pageSize;
    this.api.setPage();
  }

  onEnter(event) {
    this.searchCards();
    event.preventDefault();
  }

  clearFilter() {
    this.attributes = new Array(7).fill(false);
    this.races = new Array(26).fill(false);
  }


  DEFINE_ATTRIBUTE = ["EARTH", "WATER", "FIRE", "WIND", "LIGHT", "DARK", "DIVINE"];
  DEFINE_RACE = ["Warrior", "Spellcaster", "Fairy", "Fiend", "Zombie", "Machine", "Aqua",
    "Pyro", "Rock", "Winged Beast", "Plant", "Insect", "Thunder", "Dragon", "Beast", "Beast-Warrior",
    "Dinosaur", "Fish", "Sea-Serpent", "Reptile", "Psychic", "Divine-Beast", "Creator God", "Wyrm",
    "Cyberse", "Yokai"]

}
