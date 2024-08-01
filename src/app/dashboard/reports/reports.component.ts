import { ChangeDetectorRef, Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Record, allRecords } from '../model';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FilterBuilder } from 'src/app/utils/FilterBuilder';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {


  files!: allRecords[];
  totalRecords: any;
  sortField: string = '';
  search: string = '';
  pageNo: number = 0;
  pageSize: number = 10;
  sortDir: string = 'DESC';

  date1: Date | undefined;
  uploadUrl = '324324'; // demo URL
  isTabletView: boolean = false;

  constructor(private reportSerice: ReportsService, private messageService: MessageService, private layoutService: LayoutService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
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
  viewReport(fileName: any) {
    this.router.navigate(['/home/report-view/', encodeURIComponent(fileName)]);
    this.cdr.detectChanges();
  }

  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  downloadPDF(): void {
    const doc = new jsPDF();
    const col = ['Date', 'FileName', 'no of records', 'Status'];
    const rows: any[] = [];

    this.files.forEach(record => {
      const temp = [record.date, record.fileName, record.noOfRecords, record.status];
      rows.push(temp);
    });

    autoTable(doc, {
      head: [col],
      body: rows,
    });

    doc.save('fileData.pdf');
  }


  loadPage(event: LazyLoadEvent) {
    this.pageNo = event.first! / 10;
    this.pageSize = event.rows!;
    if (event.sortField) {
      this.sortField = event.sortField;
    }
    this.sortDir = event.sortOrder! > 0 ? 'ASC' : 'DESC';
    this.getFilter('');
  }

  getFilter(searchString: string) {
    this.search = searchString;
    var filter = '';
    if (this.search !== '') {
      var filtercols = [
        'noOfRecords', 'fileName', 'status', 'creationDate'
      ];
      filter = FilterBuilder.build(filtercols, this.search);
    }
    this.reportSerice
      .getReports(
        this.pageNo,
        this.pageSize,
        this.sortField,
        this.sortDir,
        filter
      )
      .then((data) => {
        if (data) {
          this.files = data.content;
          this.totalRecords = data.totalElements;
        }
      });
  }
}
