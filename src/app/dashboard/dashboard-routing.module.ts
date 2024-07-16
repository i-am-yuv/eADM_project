import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { LandingComponent } from './landing/landing.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportViewComponent } from './reports/report-view/report-view.component';
import { ConsentComponent } from './consent/consent.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'reports', component: ReportsComponent },
      
      { path: 'report-view/:fileName', component: ReportViewComponent },
      {path:'consent',component:ConsentComponent},
      {path:'user',component:UserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
