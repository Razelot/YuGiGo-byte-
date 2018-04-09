import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { CardService } from '../../services/card.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

  decks$: Observable<any>;

  constructor(public api: CardService, public navi: NavigationService) { }

  ngOnInit() {
    this.decks$ = this.api.getDecks();
  }

  selectDeck(key) {
    this.api.selectedDeck = key;
    this.navi.view = 2;
    console.log(key);
  }

  unselectDeck() {
    this.api.selectedDeck = null;
  }


}
