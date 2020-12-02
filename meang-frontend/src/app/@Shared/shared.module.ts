import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFilterComponent } from './components/dynamic-filter/dynamic-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { CarouselPComponent } from './components/carousel-p/carousel-p.component';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QtySelectorComponent } from './components/qty-selector/qty-selector/qty-selector.component';
import { CreateProductColorComponent } from './components/create-product-color/create-product-color.component';

@NgModule({
  declarations: [
    DynamicTableComponent,
    DynamicFilterComponent,
    CarouselPComponent,
    LoadingComponent,
    QtySelectorComponent,
    CreateProductColorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    DynamicTableComponent,
    DynamicFilterComponent,
    CarouselPComponent,
    LoadingComponent,
    CreateProductColorComponent,
  ],
})
export class SharedModule {}
