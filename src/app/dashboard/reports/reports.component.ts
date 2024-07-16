import { ChangeDetectorRef, Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { Record, allRecords } from '../model';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {


  allRecords!: allRecords[];

  date1: Date | undefined;
  uploadUrl = '324324'; // demo URL
  isTabletView: boolean = false;

  constructor(private messageService: MessageService, private layoutService: LayoutService,private router:Router) { }

  ngOnInit() {
    this.allRecords = [
      { date: '01/01/23', fileName: 'File Name 1.xlsx', noOfRecords: '100', status: 'success' },
      { date: '01/01/23', fileName: 'File Name 1.xlsx', noOfRecords: '100', status: 'success' },
      { date: '02/01/23', fileName: 'File Name 2.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '03/01/23', fileName: 'File Name 3.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '04/01/23', fileName: 'File Name 4.xlsx', noOfRecords: '100', status: 'success' },
      { date: '05/01/23', fileName: 'File Name 5.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '06/01/23', fileName: 'File Name 6.xlsx', noOfRecords: '100', status: 'Partially Uploaded' },
      { date: '07/01/23', fileName: 'File Name 7.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '08/01/23', fileName: 'File Name 8.xlsx', noOfRecords: '100', status: 'success' },
      { date: '09/01/23', fileName: 'File Name 9.xlsx', noOfRecords: '100', status: 'success' },
      { date: '10/01/23', fileName: 'File Name 10.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '11/01/23', fileName: 'File Name 11.xlsx', noOfRecords: '100', status: 'success' },
      { date: '12/01/23', fileName: 'File Name 12.xlsx', noOfRecords: '100', status: 'success' },
      { date: '13/01/23', fileName: 'File Name 13.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '14/01/23', fileName: 'File Name 14.xlsx', noOfRecords: '100', status: 'success' },
      { date: '15/01/23', fileName: 'File Name 15.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '16/01/23', fileName: 'File Name 16.xlsx', noOfRecords: '100', status: 'success' },
      { date: '17/01/23', fileName: 'File Name 17.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '18/01/23', fileName: 'File Name 18.xlsx', noOfRecords: '100', status: 'success' },
      { date: '19/01/23', fileName: 'File Name 19.xlsx', noOfRecords: '100', status: 'success' },
      { date: '20/01/23', fileName: 'File Name 20.xlsx', noOfRecords: '100', status: 'success' },
      { date: '21/01/23', fileName: 'File Name 21.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '22/01/23', fileName: 'File Name 22.xlsx', noOfRecords: '100', status: 'success' },
      { date: '23/01/23', fileName: 'File Name 23.xlsx', noOfRecords: '100', status: 'success' },
      { date: '24/01/23', fileName: 'File Name 24.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '25/01/23', fileName: 'File Name 25.xlsx', noOfRecords: '100', status: 'success' },
      { date: '26/01/23', fileName: 'File Name 26.xlsx', noOfRecords: '100', status: 'success' },
      { date: '27/01/23', fileName: 'File Name 27.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '28/01/23', fileName: 'File Name 28.xlsx', noOfRecords: '100', status: 'success' },
      { date: '29/01/23', fileName: 'File Name 29.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '30/01/23', fileName: 'File Name 30.xlsx', noOfRecords: '100', status: 'success' },
      { date: '31/01/23', fileName: 'File Name 31.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '01/02/23', fileName: 'File Name 32.xlsx', noOfRecords: '100', status: 'success' },
      { date: '02/02/23', fileName: 'File Name 33.xlsx', noOfRecords: '100', status: 'success' },
      { date: '03/02/23', fileName: 'File Name 34.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '04/02/23', fileName: 'File Name 35.xlsx', noOfRecords: '100', status: 'success' },
      { date: '05/02/23', fileName: 'File Name 36.xlsx', noOfRecords: '100', status: 'success' },
      { date: '06/02/23', fileName: 'File Name 37.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '07/02/23', fileName: 'File Name 38.xlsx', noOfRecords: '100', status: 'success' },
      { date: '08/02/23', fileName: 'File Name 39.xlsx', noOfRecords: '100', status: 'success' },
      { date: '09/02/23', fileName: 'File Name 40.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '10/02/23', fileName: 'File Name 41.xlsx', noOfRecords: '100', status: 'success' },
      { date: '11/02/23', fileName: 'File Name 42.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '12/02/23', fileName: 'File Name 43.xlsx', noOfRecords: '100', status: 'success' },
      { date: '13/02/23', fileName: 'File Name 44.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '14/02/23', fileName: 'File Name 45.xlsx', noOfRecords: '100', status: 'success' },
      { date: '15/02/23', fileName: 'File Name 46.xlsx', noOfRecords: '100', status: 'success' },
      { date: '16/02/23', fileName: 'File Name 47.xlsx', noOfRecords: '100', status: 'failure' },
      { date: '17/02/23', fileName: 'File Name 48.xlsx', noOfRecords: '100', status: 'success' },
      { date: '18/02/23', fileName: 'File Name 49.xlsx', noOfRecords: '100', status: 'success' },
      { date: '19/02/23', fileName: 'File Name 50.xlsx', noOfRecords: '100', status: 'failure' },
  ];
  
    this.layoutService.getData('reports');

    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }
  // code for left pannel removal for less than tablet view
  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }
  viewReport(fileName:any){
    this.router.navigate(['/home/report-view/', encodeURIComponent(fileName)]);

  }
}
