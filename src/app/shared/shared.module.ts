import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { IconComponent } from './components/icon/icon.component';
import { TableComponent } from './components/table/table.component';
import { CardTableComponent } from './components/card-table/card-table.component';

@NgModule({
  declarations: [
    WebviewDirective,
    CardComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
    TableComponent,
    CardTableComponent
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    WebviewDirective,
    CardComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
    TableComponent,
    CardTableComponent
  ]
})
export class SharedModule {}
