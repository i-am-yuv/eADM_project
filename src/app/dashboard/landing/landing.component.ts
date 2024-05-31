import { Component } from '@angular/core';
import { Record } from '../model';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  records!: Record[];
  // first = 0;
  // rows = 10;
  
  date1: Date | undefined;
  uploadUrl = '324324'; // demo URL

  constructor(private messageService : MessageService) { }

  ngOnInit() {
    this.records = [
      { date: '01/01/23', accountNumber: '1234567890123456', status: 'Approved' },
      { date: '02/01/23', accountNumber: '2345678901234567', status: 'Rejected' },
      { date: '03/01/23', accountNumber: '3456789012345678', status: 'Approved' },
      { date: '04/01/23', accountNumber: '4567890123456789', status: 'Rejected' },
      { date: '05/01/23', accountNumber: '5678901234567890', status: 'Approved' },
      { date: '06/01/23', accountNumber: '6789012345678901', status: 'Rejected' },
      { date: '07/01/23', accountNumber: '7890123456789012', status: 'Approved' },
      { date: '08/01/23', accountNumber: '8901234567890123', status: 'Rejected' },
      { date: '09/01/23', accountNumber: '9012345678901234', status: 'Approved' },
      { date: '10/01/23', accountNumber: '0123456789012345', status: 'Rejected' },
      { date: '11/01/23', accountNumber: '1234567890123456', status: 'Approved' },
      { date: '12/01/23', accountNumber: '2345678901234567', status: 'Rejected' },
      { date: '13/01/23', accountNumber: '3456789012345678', status: 'Approved' },
      { date: '14/01/23', accountNumber: '4567890123456789', status: 'Rejected' },
      { date: '15/01/23', accountNumber: '5678901234567890', status: 'Approved' },
      { date: '16/01/23', accountNumber: '6789012345678901', status: 'Rejected' },
      { date: '17/01/23', accountNumber: '7890123456789012', status: 'Approved' },
      { date: '18/01/23', accountNumber: '8901234567890123', status: 'Rejected' },
      { date: '19/01/23', accountNumber: '9012345678901234', status: 'Approved' },
      { date: '20/01/23', accountNumber: '0123456789012345', status: 'Rejected' },
      { date: '21/01/23', accountNumber: '1234567890123456', status: 'Approved' },
      { date: '22/01/23', accountNumber: '2345678901234567', status: 'Rejected' },
      { date: '23/01/23', accountNumber: '3456789012345678', status: 'Approved' },
      { date: '24/01/23', accountNumber: '4567890123456789', status: 'Rejected' },
      { date: '25/01/23', accountNumber: '5678901234567890', status: 'Approved' },
      { date: '26/01/23', accountNumber: '6789012345678901', status: 'Rejected' },
      { date: '27/01/23', accountNumber: '7890123456789012', status: 'Approved' },
      { date: '28/01/23', accountNumber: '8901234567890123', status: 'Rejected' },
      { date: '29/01/23', accountNumber: '9012345678901234', status: 'Approved' },
      { date: '30/01/23', accountNumber: '0123456789012345', status: 'Rejected' },
      { date: '31/01/23', accountNumber: '1234567890123456', status: 'Approved' },
      { date: '01/02/23', accountNumber: '2345678901234567', status: 'Rejected' },
      { date: '02/02/23', accountNumber: '3456789012345678', status: 'Approved' },
      { date: '03/02/23', accountNumber: '4567890123456789', status: 'Rejected' },
      { date: '04/02/23', accountNumber: '5678901234567890', status: 'Approved' },
      { date: '05/02/23', accountNumber: '6789012345678901', status: 'Rejected' },
      { date: '06/02/23', accountNumber: '7890123456789012', status: 'Approved' },
      { date: '07/02/23', accountNumber: '8901234567890123', status: 'Rejected' },
      { date: '08/02/23', accountNumber: '9012345678901234', status: 'Approved' },
      { date: '09/02/23', accountNumber: '0123456789012345', status: 'Rejected' },
      { date: '10/02/23', accountNumber: '1234567890123456', status: 'Approved' },
      { date: '11/02/23', accountNumber: '2345678901234567', status: 'Rejected' },
      { date: '12/02/23', accountNumber: '3456789012345678', status: 'Approved' },
      { date: '13/02/23', accountNumber: '4567890123456789', status: 'Rejected' },
      { date: '14/02/23', accountNumber: '5678901234567890', status: 'Approved' },
      { date: '15/02/23', accountNumber: '6789012345678901', status: 'Rejected' },
      { date: '16/02/23', accountNumber: '7890123456789012', status: 'Approved' },
      { date: '17/02/23', accountNumber: '8901234567890123', status: 'Rejected' },
      { date: '18/02/23', accountNumber: '9012345678901234', status: 'Approved' },
      { date: '19/02/23', accountNumber: '0123456789012345', status: 'Rejected' },
    ];
  }

  // next() {
  //   this.first = this.first + this.rows;
  // }

  // prev() {
  //   this.first = this.first - this.rows;
  // }

  // reset() {
  //   this.first = 0;
  // }

  // pageChange(event: any) {
  //   this.first = event.first;
  //   this.rows = event.rows;
  // }

  // isLastPage(): boolean {
  //   return this.records ? this.first === this.records.length - this.rows : true;
  // }

  // isFirstPage(): boolean {
  //   return this.records ? this.first === 0 : true;
  // }

  first: number = 0;

    rows: number = 10;

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

  importResponseHandler(event: any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'All records imported successfully',
      life: 5000,
    });
    if (event.originalEvent.status === 200) {
      
    }
    // this.getCatalogFilter(this.search);
  }
 
  importErrorHandler(event: any) {
    //
    var array = event.error.error.text.split(/\r?\n/);
    var count = array.length - 2;
    var final = count + ' Invalid  records';
    this.messageService.add({
      severity: 'error',
      summary: 'Import Error',
      detail: final,
      life: 5000,
    });
 
    var blob = new Blob([event.error.error.text], {
      type: 'text/plain',
    });
    saveAs(blob, 'StoreCatalogImportError.csv');
    setTimeout(HelloWorld, 4000);
    function HelloWorld() {
      window.location.reload();
    }
  }

}
