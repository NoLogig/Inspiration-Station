import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTreeModule, MatIconModule, MatButtonModule, MatGridListModule, MatCardModule, MatMenuModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatSidenavModule, MatListModule,
  MatInputModule, MatSelectModule, MatRadioModule, MatTabsModule, MatDividerModule, MatSliderModule, MatProgressSpinnerModule
} from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragdropComponent } from './dragdrop/dragdrop.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form/address-form.component';

import { LayoutModule } from '@angular/cdk/layout';
import { TreeComponent } from './tree/tree.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { TableComponent } from './table/table.component';
import { CdkTableModule } from '@angular/cdk/table';

import { NavigationComponent } from './navigation/navigation.component';

import { RouterModule } from '@angular/router';
import { MatLayoutsComponent } from "./layouts.component";

import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { VirtualScollingComponent } from './virtual-scolling/virtual-scolling.component';

import { PlatformComponent } from './platform/platform.component';


@NgModule({
  declarations: [
    AddressFormComponent,
    DashboardComponent,
    DragdropComponent,
    NavigationComponent,
    TableComponent,
    TreeComponent,
    MatLayoutsComponent,
    VirtualScollingComponent,
    PlatformComponent
  ],
  exports: [
    MatLayoutsComponent, MatCardModule
  ],
  imports: [
    CommonModule,

    DragDropModule, LayoutModule, BusinessCardModule, CdkTableModule, ScrollDispatchModule,
    
    MatTabsModule, MatCardModule, MatDividerModule, MatSliderModule, MatProgressSpinnerModule,
    MatTreeModule, MatIconModule, MatButtonModule, MatGridListModule, MatCardModule, 
    MatMenuModule, MatTableModule, MatRadioModule, MatPaginatorModule, MatSortModule,
    MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatSelectModule,

    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'mat-layouts',
        component: MatLayoutsComponent
      }
    ]),
  ]
})
export class MatSchematicLayoutsModule { }
