import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  // 0 => trunk
  // 1 => deck
  view: number = 0;

  // UI Related
  cardWidth: number = 100;
  matGridOptions: { cols: number, rowHeight: string } = {
    cols: 8,
    rowHeight: '10:15',
  };

  constructor() { }
  
  setView(val){
    this.view = val;
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
    cols = document.getElementById('card-grid-main').clientWidth / this.cardWidth;

    cols = Math.floor(cols);

    this.matGridOptions.cols = cols;
  }


}
