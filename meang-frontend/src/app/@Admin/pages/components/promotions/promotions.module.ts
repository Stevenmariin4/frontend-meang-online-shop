import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../../@Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { ListPromotionsComponent } from './list-promotions/list-promotions.component';
import { CreateUpdatePromotionsComponent } from './create-update-promotions/create-update-promotions.component';

@NgModule({
  declarations: [ListPromotionsComponent, CreateUpdatePromotionsComponent],
  imports: [CommonModule, PromotionsRoutingModule, SharedModule, FormsModule],
})
export class PromotionsModule {}
