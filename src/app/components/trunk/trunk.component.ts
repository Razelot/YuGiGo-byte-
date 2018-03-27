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


  cards: Card[] = [];
  cardsPaged: Card[] = [];
  // selectedCard: Card;

  loading: boolean = true;

  // Card Filter and Search
  query: string;

  attributes: boolean[];
  races: boolean[];

  // UI Related
  cardWidth: number = 100;
  matGridOptions: { cols: number, rowHeight: string } = {
    cols: 8,
    rowHeight: '10:15',
  };


  // Paginator Inputs
  cardCount = 0;
  pageIndex = 0;
  pageSize = 40;
  pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  constructor(public api: CardService, public navi: NavigationService) { }

  ngOnInit() {

    let self = this;

    this.clearFilter();

    // this.api.getCards().subscribe(cards => {
    //   this.cards = cards;
    //   this.cardCount = cards.length;
    //   this.setPage();
    // });


    this.cardCount = this.api.cards.length;
    this.setPage();


    this.cardSizeSlider.registerOnChange((value) => {
      this.onCardSizeSliderChanged(value);
    });


    window.addEventListener('resize', function () {
      self.updateCardGridCols();
    }, true);

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

  onCardSizeSliderChanged(value: any) {

    let minWidth = 50;
    let maxWidth = 250;
    let stepperWidth = (250 - 50) / 100;

    this.cardWidth = (stepperWidth * value) + minWidth;


    this.updateCardGridCols();
  }

  updateCardGridCols() {
    let cols = 1;
    cols = document.getElementById('card-grid').clientWidth / this.cardWidth;

    cols = Math.floor(cols);

    this.matGridOptions.cols = cols;
  }

  onPageChange(event) {
    this.api.pageIndex = event.pageIndex;
    this.api.pageSize = event.pageSize;
    this.api.setPage();
  }

  setPage() {
    var range = [(this.pageIndex) * this.pageSize, Math.min(this.cardCount, (this.pageIndex + 1) * this.pageSize)];
    this.cardsPaged = [];
    for (var i = 0; i < range[1] - range[0]; i++) {
      this.cardsPaged[i] = this.cards[range[0] + i];
    }
    this.loading = false;
  }

  onCardClick(card) {
    console.log(card);
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
