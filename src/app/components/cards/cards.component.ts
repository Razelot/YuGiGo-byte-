import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';
import { Subscription } from 'rxjs/Subscription';

import { forEach } from '@angular/router/src/utils/collection';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(public api: CardService) { }

  cardWidth: number = 50;

  cards: Card[] = [];

  cardsPaged: Card[] = [];

  selectedCard: Card;

  query: string;

  matGridOptions: { cols: number, rowHeight: string } = {
    cols: 10,
    rowHeight: '10:14',
  };


  // MatPaginator Inputs
  length = 0;

  pageIndex = 0;
  pageSize = 40;
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // MatPaginator Output
  pageEvent: PageEvent;


  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  eventSubscription: Subscription;

  ngOnInit() {



    let self = this;

    // this.api.searchCards("Red-Eyes").subscribe(cards => {
    //   this.cards = cards;
    //   this.length = cards.length;
    //   this.setPage();
    // });

    this.api.getCards().subscribe(cards => {
      this.cards = cards;
      this.length = cards.length;
      this.setPage();
    });


    this.cardSizeSlider.registerOnChange((value) => {
      this.onCardSizeSliderChanged(value);
    });

    window.addEventListener('resize', function () {
      self.updateCardGridCols();
    }, true);



  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  setCards() {
    this.api.searchCards(this.query).subscribe(cards => {
      this.cards = cards;
      this.length = cards.length;
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
    var range = [(this.pageIndex) * this.pageSize, Math.min(this.length, (this.pageIndex + 1) * this.pageSize)];
    this.cardsPaged = [];
    for (var i = 0; i < range[1] - range[0]; i++) {
      this.cardsPaged[i] = this.cards[range[0] + i];
    }
  }

  onCardClick(card) {
    console.log(card);
  }

  onEnter(event) {
    this.setCards();
    event.preventDefault();
  }

}
