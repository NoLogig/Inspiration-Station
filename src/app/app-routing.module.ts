import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GithubViewerComponent } from './pages/API/github-viewer/github-viewer.component';
import { ImpressumComponent } from './home/impressum/impressum.component';
import { SplitScreenSkewedComponent } from './pages/layouts/split-screen-skewed/split-screen-skewed.component';
import { TheoremsComponent } from './pages/math/theorems/theorems.component';
import { HarmonyComponent } from './pages/harmony/harmony.component';

export const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SplitScreenSkewedComponent, pathMatch: 'full' },
  
  { path: 'github', component: GithubViewerComponent},
  { path: 'impressum', component: ImpressumComponent },
  { path: 'theorems', component: TheoremsComponent },
  { path: 'harmony', component: HarmonyComponent },
  
  { path: 'timers', loadChildren: './pages/PEIL/timers/timers.module#TimersModule' },
  { path: 'outside-clicks', loadChildren: './pages/PEIL/outside-clicks/outside-clicks.module#OutsideClicksModule' },
  
  // { path: 'img/:id', component: ImageManipulationComponent,
  //   children: [
  //     { path: '', redirectTo: 'overview', pathMatch: 'full' },
  //     { path: 'overview', component: ImgOverviewComponent },
  //     { path: 'specs', component: ImgSpecsComponent }
  //   ]
  // },
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
