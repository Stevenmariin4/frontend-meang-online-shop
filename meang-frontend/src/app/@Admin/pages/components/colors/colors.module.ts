import { FormsModule } from '@angular/forms';
import { SharedModule } from '@Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ListColorsComponent } from './list-colors/list-colors.component';
import { CreateUpdateColorsComponent } from './create-update-colors/create-update-colors.component';

@NgModule({
  declarations: [ListColorsComponent, CreateUpdateColorsComponent],
  imports: [CommonModule, ColorsRoutingModule, SharedModule, FormsModule],
})
export class ColorsModule {}
