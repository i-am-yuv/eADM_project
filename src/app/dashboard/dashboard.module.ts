import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './reports/reports.component';
import { ReportViewComponent } from './reports/report-view/report-view.component';
import { ConsentComponent } from './consent/consent.component';
import { UserComponent } from './user/user.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [
    LandingComponent,
    ReportsComponent,
    ReportViewComponent,
    ConsentComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ConfirmDialogModule,
    InputSwitchModule
  ],providers: [ DatePipe ], 
})
export class DashboardModule { }
