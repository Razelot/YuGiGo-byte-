import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';


@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  thumbnailPath: string = "";
  imagePath: string = "";

  @Input() card: Card;

  constructor(private api: CardService) { }

  ngOnInit() {
    this.api.getCardApiary(this.card.name).subscribe(res => {
      if (res.status == "success") {
        this.thumbnailPath = res.card.thumbnail_path;
        this.imagePath = res.card.image_path;
      }
    });
  }

  onCardClick(selectedCard: Card) {
    this.api.getCard(this.card.name).subscribe(card => {
      this.api.selectedCard = card;
    });
    this.api.selectedImagePath = this.imagePath;
  }
}
