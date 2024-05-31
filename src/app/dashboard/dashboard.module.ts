import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    LandingComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
