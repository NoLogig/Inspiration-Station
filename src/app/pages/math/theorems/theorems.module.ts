import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

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
