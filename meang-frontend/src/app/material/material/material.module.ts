import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
// import { AlertDialogComponent } from '../components/common/alert-dialog/alert-dialog.component';
// import { TranslatePipe } from '../translate/translate.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatRadioModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    ScrollingModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSortModule,
    ScrollingModule,
  ],
})
export class MaterialModule {}
