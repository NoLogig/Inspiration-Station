import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule,
  MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
  MatSliderModule, MatTabsModule, MatFormFieldModule
} from '@angular/material';

import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';

import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { FactorialComponent } from './factorial/factorial.component';
import { PythagorasComponent } from './pythagoras/pythagoras.component';
import { SierpinskiTriangleComponent } from './sierpinski-triangle/sierpinski-triangle.component';
import { SieveAtkinComponent } from './sieve-atkin/sieve-atkin.component';
import { SieveEratosthenesComponent } from './sieve-eratosthenes/sieve-eratosthenes.component';
import { SphereComponent } from './sphere/sphere.component';
import { SpiralSacksComponent } from './spiral-sacks/spiral-sacks.component';
import { SpiralUlamComponent } from './spiral-ulam/spiral-ulam.component';
import { TheoremsComponent } from './theorems.component';
import { TheoremEuclidEulerComponent } from './euclid-euler/euclid-euler.component';

@NgModule({
  imports: [
    FormsModule, CommonModule,

    BusinessCardModule,

    MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatSliderModule, MatTabsModule,

    RouterModule.forRoot([
      {
        path: 'theorems',
        component: TheoremsComponent
      }
    ])
  ],
  exports: [TheoremsComponent],
  declarations: [
    FactorialComponent, FibonacciComponent, PythagorasComponent, SierpinskiTriangleComponent, SieveAtkinComponent, SieveEratosthenesComponent,
    SphereComponent, SpiralSacksComponent, SpiralUlamComponent, TheoremEuclidEulerComponent, TheoremsComponent,
  ]
})
export class TheoremsModule { }
