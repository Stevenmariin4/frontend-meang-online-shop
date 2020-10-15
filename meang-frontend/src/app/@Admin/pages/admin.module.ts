import { TitleComponent } from '@admin-core/components/title/title.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from '@admin-core/components/header/header.component';
import { SidebarComponent } from '@admin-core/components/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material/material/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { ListColorsComponent } from './components/colors/list-colors/list-colors.component';
import { CreateUpdateColorsComponent } from './components/colors/create-update-colors/create-update-colors.component';
@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    TitleComponent,
    SidebarComponent,
    ListColorsComponent,
    CreateUpdateColorsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MaterialModule,
    MatTooltipModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
  ],
})
export class AdminModule {}
