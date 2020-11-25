import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../../@Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListFacturesComponent } from './list-factures/list-factures.component';
import { ViewFacturesComponent } from './view-factures/view-factures.component';

@NgModule({
  declarations: [ListFacturesComponent, ViewFacturesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    MatTabsModule,
  ],
})
export class DashboardModule {}
