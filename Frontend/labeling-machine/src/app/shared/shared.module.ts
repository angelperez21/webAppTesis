// Modulos de angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Modulos de material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
// Componentes propios

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatRadioModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatRadioModule,
    RouterModule
  ]
})
export class SharedModule { }
