import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../models/card';

import { CardApiary } from '../models/cardApiary';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CardService {

  cards: Card[] = [];
  cardsPaged: Card[] = [];

  loading: boolean = true;

  // Card Filter and Search
  query: string;

  // Paginator Inputs
  cardCount = 0;
  pageIndex = 0;
  pageSize = 40;
  pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  selectedCard: Card = new Card();
  selectedCardCount: Observable<any>;
  selectedImagePath: string = "assets/card-back.jpg";

  selectedDeck: string;


  constructor(private http: HttpClient, private af: AngularFireDatabase) {

    this.getCards().subscribe(cards => {
      this.cards = cards;
      this.cardCount = cards.length;
      this.setPage();
    });

    // Removes any unused cards in the deck list
    this.deckCleaner();
  }

  setPage() {
    var range = [(this.pageIndex) * this.pageSize, Math.min(this.cardCount, (this.pageIndex + 1) * this.pageSize)];
    this.cardsPaged = [];
    for (var i = 0; i < range[1] - range[0]; i++) {
      this.cardsPaged[i] = this.cards[range[0] + i];
    }
    this.loading = false;
  }

  getCards() {
    return this.http.get<Card[]>('/api/cards/');
  }

  searchCards(query, filterAttributes, filterRaces) {
    let params = query ? encodeURI(query) + "?" : "?";

    if (filterAttributes.length > 0) {
      params = params + "attributes=" + encodeURI(filterAttributes.toString()) + "&";
    }

    if (filterRaces.length > 0) {
      params = params + "races=" + encodeURI(filterRaces.toString()) + "&";
    }

    return this.http.get<Card[]>('/api/cards/' + params);
  }

  getCard(cardId) {
    return this.http.get<Card>('/api/card/' + cardId);
  }

  getCardApiary(cardName) {
    return this.http.get<CardApiary>('https://www.ygohub.com/api/card_info?name=' + cardName);
  }

  addSelected() {
    if (!this.selectedCard.id) return;
    this.af.object('deck/' + this.selectedCard.id).query.ref.transaction(card => {
      if (card === null) {
        let addCard = this.selectedCard;
        addCard.qty = 1;
        return addCard;
      } else if (card.qty < 3) {
        let addCard = card;
        addCard.qty += 1;
        return addCard;
      }
    });
  }

  removeSelected() {
    if (!this.selectedCard.id) return;
    this.af.object('deck/' + this.selectedCard.id).query.ref.transaction(card => {
      if (card === null) {
        let removeCard = this.selectedCard;
        removeCard.qty = 0;
        return removeCard;
      } else if (card.qty > 0) {
        let removeCard = card;
        removeCard.qty -= 1;
        return removeCard;
      }
    });
  }

  getDeck(): Observable<Card[]> {
    return this.af.list('deck').valueChanges().map(changes => {
      return changes.map(c => <Card>(c));
    });
  }

  deckCleaner() {
    this.getDeck().subscribe(cards => {
      cards.forEach(card => {
        if (card.qty < 1) {
          this.af.object('deck/' + card.id).remove();
        }
      });
    });
  }

  getDecks() {
    return this.af.list('decks').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  countCard(){
    console.log('deck/' + this.selectedCard.id + '/qty');
    this.selectedCardCount =this.af.object('deck/' + this.selectedCard.id + '/qty').valueChanges();
  }
}