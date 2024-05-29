import { Component } from '@angular/core';
import { Record } from '../model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  records!: Record[];
  first = 0;
  rows = 10;
  
  date1: Date | undefined;

  constructor() { }

  ngOnInit() {
    this.records = [
      { date: '01/01/23', accountNumber: '1234567890123456', status: 'Active' },
      { date: '02/01/23', accountNumber: '2345678901234567', status: 'Inactive' },
      { date: '03/01/23', accountNumber: '3456789012345678', status: 'Active' },
      { date: '04/01/23', accountNumber: '4567890123456789', status: 'Inactive' },
      { date: '05/01/23', accountNumber: '5678901234567890', status: 'Active' },
      { date: '06/01/23', accountNumber: '6789012345678901', status: 'Inactive' },
      { date: '07/01/23', accountNumber: '7890123456789012', status: 'Active' },
      { date: '08/01/23', accountNumber: '8901234567890123', status: 'Inactive' },
      { date: '09/01/23', accountNumber: '9012345678901234', status: 'Active' },
      { date: '10/01/23', accountNumber: '0123456789012345', status: 'Inactive' },
      { date: '11/01/23', accountNumber: '1234567890123456', status: 'Active' },
      { date: '12/01/23', accountNumber: '2345678901234567', status: 'Inactive' },
      { date: '13/01/23', accountNumber: '3456789012345678', status: 'Active' },
      { date: '14/01/23', accountNumber: '4567890123456789', status: 'Inactive' },
      { date: '15/01/23', accountNumber: '5678901234567890', status: 'Active' },
      { date: '16/01/23', accountNumber: '6789012345678901', status: 'Inactive' },
      { date: '17/01/23', accountNumber: '7890123456789012', status: 'Active' },
      { date: '18/01/23', accountNumber: '8901234567890123', status: 'Inactive' },
      { date: '19/01/23', accountNumber: '9012345678901234', status: 'Active' },
      { date: '20/01/23', accountNumber: '0123456789012345', status: 'Inactive' },
      { date: '21/01/23', accountNumber: '1234567890123456', status: 'Active' },
      { date: '22/01/23', accountNumber: '2345678901234567', status: 'Inactive' },
      { date: '23/01/23', accountNumber: '3456789012345678', status: 'Active' },
      { date: '24/01/23', accountNumber: '4567890123456789', status: 'Inactive' },
      { date: '25/01/23', accountNumber: '5678901234567890', status: 'Active' },
      { date: '26/01/23', accountNumber: '6789012345678901', status: 'Inactive' },
      { date: '27/01/23', accountNumber: '7890123456789012', status: 'Active' },
      { date: '28/01/23', accountNumber: '8901234567890123', status: 'Inactive' },
      { date: '29/01/23', accountNumber: '9012345678901234', status: 'Active' },
      { date: '30/01/23', accountNumber: '0123456789012345', status: 'Inactive' },
      { date: '31/01/23', accountNumber: '1234567890123456', status: 'Active' },
      { date: '01/02/23', accountNumber: '2345678901234567', status: 'Inactive' },
      { date: '02/02/23', accountNumber: '3456789012345678', status: 'Active' },
      { date: '03/02/23', accountNumber: '4567890123456789', status: 'Inactive' },
      { date: '04/02/23', accountNumber: '5678901234567890', status: 'Active' },
      { date: '05/02/23', accountNumber: '6789012345678901', status: 'Inactive' },
      { date: '06/02/23', accountNumber: '7890123456789012', status: 'Active' },
      { date: '07/02/23', accountNumber: '8901234567890123', status: 'Inactive' },
      { date: '08/02/23', accountNumber: '9012345678901234', status: 'Active' },
      { date: '09/02/23', accountNumber: '0123456789012345', status: 'Inactive' },
      { date: '10/02/23', accountNumber: '1234567890123456', status: 'Active' },
      { date: '11/02/23', accountNumber: '2345678901234567', status: 'Inactive' },
      { date: '12/02/23', accountNumber: '3456789012345678', status: 'Active' },
      { date: '13/02/23', accountNumber: '4567890123456789', status: 'Inactive' },
      { date: '14/02/23', accountNumber: '5678901234567890', status: 'Active' },
      { date: '15/02/23', accountNumber: '6789012345678901', status: 'Inactive' },
      { date: '16/02/23', accountNumber: '7890123456789012', status: 'Active' },
      { date: '17/02/23', accountNumber: '8901234567890123', status: 'Inactive' },
      { date: '18/02/23', accountNumber: '9012345678901234', status: 'Active' },
      { date: '19/02/23', accountNumber: '0123456789012345', status: 'Inactive' },
    ];
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.records ? this.first === this.records.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.records ? this.first === 0 : true;
  }

}
