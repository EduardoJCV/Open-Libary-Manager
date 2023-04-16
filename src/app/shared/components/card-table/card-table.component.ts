import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
})
export class CardTableComponent {

  @Input() loading?: boolean = true;
  @Input() tableTitle: string;
  @Input() data?: {
    headers: string[];
    data: {
      type: string;
      text: string;
      img?: string;
    }[][];
  };

  constructor() {}

}
