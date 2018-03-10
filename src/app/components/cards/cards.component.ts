import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { Subscription } from 'rxjs/Subscription';

import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {


  cards: Card[] = [];
  cardsPaged: Card[] = [];
  selectedCard: Card;

  // Card Filter and Search
  query: string;

  attributes: boolean[] = new Array(6).fill(false);
  races: boolean[] = new Array(26).fill(false);

  // UI Related
  cardWidth: number = 50;
  matGridOptions: { cols: number, rowHeight: string } = {
    cols: 10,
    rowHeight: '10:15',
  };


  // Paginator Inputs
  cardCount = 0;
  pageIndex = 0;
  pageSize = 40;
  pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  constructor(public api: CardService) { }

  ngOnInit() {

    let self = this;

    this.api.getCards().subscribe(cards => {
      this.cards = cards;
      this.cardCount = cards.length;
      this.setPage();
    });


    this.cardSizeSlider.registerOnChange((value) => {
      this.onCardSizeSliderChanged(value);
    });

    window.addEventListener('resize', function () {
      self.updateCardGridCols();
    }, true);

  }

  searchCards() {

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

    this.api.searchCards(this.query, filterAttributes, filterRaces).subscribe(cards => {
      this.cards = cards;
      this.cardCount = cards.length;
      this.pageIndex = 0;
      this.setPage();
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

    let cols = 0;
    cols = document.getElementById('card-grid').clientWidth / this.cardWidth;

    cols = Math.floor(cols);

    this.matGridOptions.cols = cols;
  }

  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPage();
  }

  setPage() {
    var range = [(this.pageIndex) * this.pageSize, Math.min(this.cardCount, (this.pageIndex + 1) * this.pageSize)];
    this.cardsPaged = [];
    for (var i = 0; i < range[1] - range[0]; i++) {
      this.cardsPaged[i] = this.cards[range[0] + i];
    }
  }

  onCardClick(card) {
    console.log(card);
  }

  onEnter(event) {
    this.searchCards();
    event.preventDefault();
  }

  clearFilter() {
    this.attributes = new Array(6).fill(false);
    this.races = new Array(26).fill(false);
  }


  DEFINE_ATTRIBUTE = ["EARTH", "WATER", "FIRE", "WIND", "LIGHT", "DARK", "DIVINE"];
  DEFINE_RACE = ["Warrior", "Spellcaster", "Fairy", "Fiend", "Zombie", "Machine", "Aqua",
    "Pyro", "Rock", "Winged Beast", "Plant", "Insect", "Thunder", "Dragon", "Beast", "Beast-Warrior",
    "Dinosaur", "Fish", "Sea-Serpent", "Reptile", "Psychic", "Divine-Beast", "Creator God", "Wyrm",
    "Cyberse", "Yokai"]

}
