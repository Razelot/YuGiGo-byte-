import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  imagePath: string = "assets/card-back-lg.jpg";
  thumbPath: string = "assets/card-back.jpg";

  thumbLoad: HTMLImageElement = new Image();
  imageLoad: HTMLImageElement = new Image();


  @Input() card: Card;

  constructor(private api: CardService, private http: HttpClient) { }

  ngOnInit() {
    // this.api.getCardApiary(this.card.name).subscribe(res => {
    // if (res.status == "success") {
    //   // this.thumbnailPath = res.card.thumbnail_path;
    //   // this.imagePath = res.card.image_path;

    //   this.imagePath = res.card.image_path;
    //   this.thumbLoad.src = res.card.thumbnail_path;

    //   this.thumbLoad.onload = () => {
    //     this.thumbPath = this.thumbLoad.src;
    //   }
    // }
    //   }
    // });

    // }
    this.thumbLoad.src = "https://www.ygoprodeck.com/pics/" + this.card.id + ".jpg";
    this.thumbLoad.onload = () => {
      this.thumbPath = this.thumbLoad.src;
    }
  }

  onCardClick(selectedCard: Card) {
    this.api.selectedCard = this.card;
    this.api.getCard(this.card.name).subscribe(card => {
      // Check if still on same card
      if (this.api.selectedCard.name == selectedCard.name) {
        this.api.selectedCard = card;
      }
    });
    this.api.selectedImagePath = this.thumbLoad.src;
    // this.imageLoad.src = this.imagePath;
    // this.imageLoad.onload = () => {
      // Check if still on same card
    //   if (this.api.selectedCard.name == selectedCard.name) {
    //     this.api.selectedImagePath = this.imageLoad.src;
    //   }
    // }
  }
}
