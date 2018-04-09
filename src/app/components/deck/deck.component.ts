import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSlider } from '@angular/material';
import { NavigationService } from '../../services/navigation.service';

import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  cardsMonster: Card[];
  cardsSpell: Card[];
  cardsTrap: Card[];
  cardsExtra: Card[];

  deckName: String;

  @ViewChild('cardSizeSlider') cardSizeSlider: MatSlider;

  constructor(public api: CardService, public navi: NavigationService) { }

  ngOnInit() {
    
    this.api.getDeck().subscribe(deck => {

      this.cardsMonster = [];
      this.cardsSpell = [];
      this.cardsTrap = [];
      this.cardsExtra = [];

      deck.forEach(card => {

        switch (card.type) {
          case "Normal Monster":
          case "Effect Monster":
          case "Ritual Monster":
          case "Ritual / Effect Monster":
          case "Spirit Monster":
          case "Union Monster":
          case "Gemini Monster":
          case "Tuner / Normal Monster":
          case "Tuner / Effect Monster":
          case "Flip Effect Monster":
          case "Toon Monster":
          case "Pendulum / Effect Monster":
            for (var i = 0; i < card.qty; i++) this.cardsMonster.push(card);
            break;
          case "Normal Spell Card":
          case "Ritual Spell":
          case "Quick-Play Spell Card":
          case "Continuous Spell Card":
          case "Equip Spell Card":
          case "Field Spell Card":
            for (var i = 0; i < card.qty; i++) this.cardsSpell.push(card);
            break;
          case "Normal Trap Card":
          case "Continuous Trap Card":
          case "Counter Trap Card":
            for (var i = 0; i < card.qty; i++) this.cardsTrap.push(card);
            break;
          default:
            for (var i = 0; i < card.qty; i++) this.cardsExtra.push(card);

        }

      });

    });

    this.cardSizeSlider.registerOnChange((value) => {
      this.navi.onCardSizeSliderChanged(value);
    });
  }

  selectDeck(key){
    this.api.selectedDeck = key;
    console.log(key);
  }

  unselectDeck() {
    this.api.selectedDeck = null;
    this.navi.view = 1;
  }

}
