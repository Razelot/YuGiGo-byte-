import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../models/card';
import { CardApiary } from '../models/cardApiary';

import 'rxjs/add/operator/map';

@Injectable()
export class CardService {

  selectedCard: Card = new Card();
  selectedImagePath: string = "assets/card-back.jpg";

  constructor(private http: HttpClient) { }

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

  getCard(cardName) {
    return this.http.get<Card>('/api/card/' + cardName);
  }

  getCardApiary(cardName) {
    return this.http.get<CardApiary>('https://www.ygohub.com/api/card_info?name=' + cardName);
  }
}