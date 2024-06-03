import { ChangeDetectorRef, Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { Record, allRecords } from '../model';
import { LayoutService } from 'src/app/shared/layout/layout.service';

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

  constructor(private messageService: MessageService, private layoutService: LayoutService) { }

  ngOnInit() {
    this.allRecords = [
      { date: '01/01/23', fileName: 'File Name 1.xlsx' },
      { date: '02/01/23', fileName: 'File Name 1.xlsx' },
      { date: '03/01/23', fileName: 'File Name 1.xlsx' },
      { date: '04/01/23', fileName: 'File Name 1.xlsx' },
      { date: '05/01/23', fileName: 'File Name 1.xlsx' },
      { date: '06/01/23', fileName: 'File Name 1.xlsx' },
      { date: '07/01/23', fileName: 'File Name 1.xlsx' },
      { date: '08/01/23', fileName: 'File Name 1.xlsx' },
      { date: '09/01/23', fileName: 'File Name 1.xlsx' },
      { date: '10/01/23', fileName: 'File Name 1.xlsx' },
      { date: '11/01/23', fileName: 'File Name 1.xlsx' },
      { date: '12/01/23', fileName: 'File Name 1.xlsx' },
      { date: '13/01/23', fileName: 'File Name 3.xlsx' },
      { date: '14/01/23', fileName: 'File Name 1.xlsx' },
      { date: '15/01/23', fileName: 'File Name 1.xlsx' },
      { date: '16/01/23', fileName: 'File Name 1.xlsx' },
      { date: '17/01/23', fileName: 'File Name 1.xlsx' },
      { date: '18/01/23', fileName: 'File Name 1.xlsx' },
      { date: '19/01/23', fileName: 'File Name 1.xlsx' },
      { date: '20/01/23', fileName: 'File Name 1.xlsx' },
      { date: '21/01/23', fileName: 'File Name 1.xlsx' },
      { date: '22/01/23', fileName: 'File Name 1.xlsx' },
      { date: '23/01/23', fileName: 'File Name 1.xlsx' },
      { date: '24/01/23', fileName: 'File Name 1.xlsx' },
      { date: '25/01/23', fileName: 'File Name 1.xlsx' },
      { date: '26/01/23', fileName: 'File Name 1.xlsx' },
      { date: '27/01/23', fileName: 'File Name 1.xlsx' },
      { date: '28/01/23', fileName: 'File Name 1.xlsx' },
      { date: '29/01/23', fileName: 'File Name 1.xlsx' },
      { date: '30/01/23', fileName: 'File Name 1.xlsx' },
      { date: '31/01/23', fileName: 'File Name 1.xlsx' },
      { date: '01/02/23', fileName: 'File Name 1.xlsx' },
      { date: '02/02/23', fileName: 'File Name 1.xlsx' },
      { date: '03/02/23', fileName: 'File Name 1.xlsx' },
      { date: '04/02/23', fileName: 'File Name 1.xlsx' },
      { date: '05/02/23', fileName: 'File Name 1.xlsx' },
      { date: '06/02/23', fileName: 'File Name 1.xlsx' },
      { date: '07/02/23', fileName: 'File Name 1.xlsx' },
      { date: '08/02/23', fileName: 'File Name 1.xlsx' },
      { date: '09/02/23', fileName: 'File Name 1.xlsx' },
      { date: '10/02/23', fileName: 'File Name 1.xlsx' },
      { date: '11/02/23', fileName: 'File Name 1.xlsx' },
      { date: '12/02/23', fileName: 'File Name 1.xlsx' },
      { date: '13/02/23', fileName: 'File Name 1.xlsx' },
      { date: '14/02/23', fileName: 'File Name 1.xlsx' },
      { date: '15/02/23', fileName: 'File Name 1.xlsx' },
      { date: '16/02/23', fileName: 'File Name 1.xlsx' },
      { date: '17/02/23', fileName: 'File Name 1.xlsx' },
      { date: '18/02/23', fileName: 'File Name 1.xlsx' },
      { date: '19/02/23', fileName: 'File Name 1.xlsx' },
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
}
