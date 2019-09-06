import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule,
  MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
  MatSliderModule, MatTabsModule, MatFormFieldModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TheoremsComponent } from './theorems.component';
import { BusinessCardModule } from 'src/app/utils/business-card/business-card.module';
import { PythagorasComponent } from './pythagoras/pythagoras.component';
import { SpiralSacksComponent } from './spiral-sacks/spiral-sacks.component';
import { TheoremEuclidEulerComponent } from './euclid-euler/euclid-euler.component';
import { SieveAtkinComponent } from './sieve-atkin/sieve-atkin.component';
import { SieveEratosthenesComponent } from './sieve-eratosthenes/sieve-eratosthenes.component';
import { SierpinskiTriangleComponent } from './sierpinski-triangle/sierpinski-triangle.component';
import { SphereComponent } from './sphere/sphere.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { FactorialComponent } from './factorial/factorial.component';
import { SpiralUlamComponent } from './spiral-ulam/spiral-ulam.component';

@NgModule({
  imports: [
    CommonModule, BusinessCardModule,

    MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule,
    MatTreeModule, MatGridListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSelectModule,
    MatSortModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatRadioModule,
    MatSliderModule, MatTabsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'theorems',
        component: TheoremsComponent
      }
    ])
  ],
  exports: [TheoremsComponent],
  declarations: [
    TheoremsComponent, SpiralSacksComponent, SpiralUlamComponent, PythagorasComponent, SpiralSacksComponent, TheoremEuclidEulerComponent, SieveAtkinComponent,
    SieveEratosthenesComponent, SierpinskiTriangleComponent, SphereComponent, FibonacciComponent, FactorialComponent
  ]
})
export class TheoremsModule { }
