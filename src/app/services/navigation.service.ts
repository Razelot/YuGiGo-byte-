import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  // 0 => trunk
  // 1 => deck
  view: number = 0;

  constructor() { }
  
  setView(val){
    this.view = val;
  }

}
