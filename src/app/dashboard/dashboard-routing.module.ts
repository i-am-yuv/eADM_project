import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [

  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', component: LandingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
