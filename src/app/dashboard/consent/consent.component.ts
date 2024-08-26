import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { allRecords } from '../model';
import { Customer } from '../reports/customer';
import { ConsentService } from './consent-service';
import { Table } from 'primeng/table';
import { FilterBuilder } from 'src/utils/FilterBuilder';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent {

  customers!: Customer[];

  date1: Date | undefined;
  //uploadUrl = '324324'; // demo URL
  isTabletView: boolean = false;

  @ViewChild('dt') dt: Table | undefined;
  constructor(private consentService:ConsentService,private messageService: MessageService, private layoutService: LayoutService,private router:Router) { }

  ngOnInit() {
    // this.customers = [
    //   { customerName: "Ramesh", accountNumber: "123334242342", emiAmount: "1000", transactionId: "tr122342", status: "success", reason: "" },
    //   { customerName: "Suresh", accountNumber: "123334242343", emiAmount: "1500", transactionId: "tr122343", status: "success", reason: "" },
    //   { customerName: "Mahesh", accountNumber: "123334242344", emiAmount: "2000", transactionId: "tr122344", status: "failure", reason: "Insufficient funds" },
    //   { customerName: "Rajesh", accountNumber: "123334242345", emiAmount: "2500", transactionId: "tr122345", status: "success", reason: "" },
    //   { customerName: "Naresh", accountNumber: "123334242346", emiAmount: "3000", transactionId: "tr122346", status: "success", reason: "" },
    //   { customerName: "Harish", accountNumber: "123334242347", emiAmount: "1200", transactionId: "tr122347", status: "failure", reason: "Overdue payments" },
    //   { customerName: "Ganesh", accountNumber: "123334242348", emiAmount: "1800", transactionId: "tr122348", status: "success", reason: "" },
    //   { customerName: "Dinesh", accountNumber: "123334242349", emiAmount: "2200", transactionId: "tr122349", status: "success", reason: "" },
    //   { customerName: "Kiran", accountNumber: "123334242350", emiAmount: "1700", transactionId: "tr122350", status: "failure", reason: "Credit score too low" },
    //   { customerName: "Mohan", accountNumber: "123334242351", emiAmount: "1400", transactionId: "tr122351", status: "success", reason: "" },
    //   { customerName: "Ashok", accountNumber: "123334242352", emiAmount: "1600", transactionId: "tr122352", status: "success", reason: "" },
    //   { customerName: "Vinod", accountNumber: "123334242353", emiAmount: "1100", transactionId: "tr122353", status: "failure", reason: "Incomplete documents" },
    //   { customerName: "Prakash", accountNumber: "123334242354", emiAmount: "1300", transactionId: "tr122354", status: "success", reason: "" },
    //   { customerName: "Ravi", accountNumber: "123334242355", emiAmount: "1900", transactionId: "tr122355", status: "success", reason: "" },
    //   { customerName: "Karthik", accountNumber: "123334242356", emiAmount: "2100", transactionId: "tr122356", status: "failure", reason: "Over limit" },
    //   { customerName: "Surya", accountNumber: "123334242357", emiAmount: "1050", transactionId: "tr122357", status: "success", reason: "" },
    //   { customerName: "Shiva", accountNumber: "123334242358", emiAmount: "1150", transactionId: "tr122358", status: "success", reason: "" },
    //   { customerName: "Raju", accountNumber: "123334242359", emiAmount: "1250", transactionId: "tr122359", status: "failure", reason: "Duplicate account" },
    //   { customerName: "Vikas", accountNumber: "123334242360", emiAmount: "1350", transactionId: "tr122360", status: "success", reason: "" },
    //   { customerName: "Vijay", accountNumber: "123334242361", emiAmount: "1450", transactionId: "tr122361", status: "success", reason: "" },
    //   { customerName: "Rahul", accountNumber: "123334242362", emiAmount: "1550", transactionId: "tr122362", status: "failure", reason: "High risk" },
    //   { customerName: "Ajay", accountNumber: "123334242363", emiAmount: "1650", transactionId: "tr122363", status: "success", reason: "" },
    //   { customerName: "Arun", accountNumber: "123334242364", emiAmount: "1750", transactionId: "tr122364", status: "success", reason: "" },
    //   { customerName: "Abhishek", accountNumber: "123334242365", emiAmount: "1850", transactionId: "tr122365", status: "failure", reason: "Payment default" },
    //   { customerName: "Anil", accountNumber: "123334242366", emiAmount: "1950", transactionId: "tr122366", status: "success", reason: "" },
    //   { customerName: "Amit", accountNumber: "123334242367", emiAmount: "2050", transactionId: "tr122367", status: "success", reason: "" },
    //   { customerName: "Suman", accountNumber: "123334242368", emiAmount: "2150", transactionId: "tr122368", status: "failure", reason: "Account inactive" },
    //   { customerName: "Naveen", accountNumber: "123334242369", emiAmount: "2250", transactionId: "tr122369", status: "success", reason: "" },
    //   { customerName: "Manoj", accountNumber: "123334242370", emiAmount: "2350", transactionId: "tr122370", status: "success", reason: "" },
    //   { customerName: "Bharath", accountNumber: "123334242371", emiAmount: "2450", transactionId: "tr122371", status: "failure", reason: "Unverified income" },
    //   { customerName: "Deepak", accountNumber: "123334242372", emiAmount: "2550", transactionId: "tr122372", status: "success", reason: "" },
    //   { customerName: "Pavan", accountNumber: "123334242373", emiAmount: "2650", transactionId: "tr122373", status: "success", reason: "" },
    //   { customerName: "Satish", accountNumber: "123334242374", emiAmount: "2750", transactionId: "tr122374", status: "failure", reason: "Multiple accounts" },
    //   { customerName: "Rakesh", accountNumber: "123334242375", emiAmount: "2850", transactionId: "tr122375", status: "success", reason: "" },
    //   { customerName: "Lokesh", accountNumber: "123334242376", emiAmount: "2950", transactionId: "tr122376", status: "success", reason: "" },
    //   { customerName: "Balaji", accountNumber: "123334242377", emiAmount: "3050", transactionId: "tr122377", status: "failure", reason: "Overdraft" },
    //   { customerName: "Sunil", accountNumber: "123334242378", emiAmount: "3150", transactionId: "tr122378", status: "success", reason: "" },
    //   { customerName: "Vishal", accountNumber: "123334242379", emiAmount: "3250", transactionId: "tr122379", status: "success", reason: "" },
    //   { customerName: "Tarun", accountNumber: "123334242380", emiAmount: "3350", transactionId: "tr122380", status: "failure", reason: "Credit limit exceeded" },
    //   { customerName: "Yogesh", accountNumber: "123334242381", emiAmount: "3450", transactionId: "tr122381", status: "success", reason: "" },
    //   { customerName: "Srinivas", accountNumber: "123334242382", emiAmount: "3550", transactionId: "tr122382", status: "success", reason: "" },
    //   { customerName: "Bhaskar", accountNumber: "123334242383", emiAmount: "3650", transactionId: "tr122383", status: "failure", reason: "Over limit" },
    //   { customerName: "Rajiv", accountNumber: "123334242384", emiAmount: "3750", transactionId: "tr122384", status: "success", reason: "" },
    //   { customerName: "Sathish", accountNumber: "123334242385", emiAmount: "3850", transactionId: "tr122385", status: "success", reason: "" },
    //   { customerName: "Madhav", accountNumber: "123334242386", emiAmount: "3950", transactionId: "tr122386", status: "failure", reason: "Bad credit history" },
    // ];  
  
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
  applyFilterGlobal($event: any, stringVal: any) {
    // this.sortField = this.store.storeName;
    var searchString = ($event.target as HTMLInputElement).value;

     this.dt?.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
    if (searchString.length > 0) {
      //this.search = searchString;
      this.getFilter(searchString);
    }
    else {
      //this.getFilter(searchString);
    }
  }


  
  sortField: string = '';
  search: string = '';
  pageNo: number = 0;
  pageSize: number = 10;
  sortDir: string = 'DESC';
  totalRecords: number=0;

  loadConsents(event: LazyLoadEvent) {
    this.pageNo = event.first! / 10;
    this.pageSize = event.rows!;
    if (event.sortField) {
      this.sortField = event.sortField;
    }
    this.sortDir = event.sortOrder! > 0 ? 'ASC' : 'DESC';
    this.consentService
      .getConsents(this.pageNo, this.pageSize, this.sortField, this.sortDir,this.search)
      .then((data:any) => {
        this.customers = data.content;
        this.totalRecords = data.totalElements;
      });
  }

  
  getFilter(searchString: string) {
    this.search = searchString;
    var filter = '';

    if (this.search !== '') {
      var filtercols = ['addressline1', 'addressline2', 'city', 'country'];
      filter = FilterBuilder.build(filtercols, this.search);
    }

    this.consentService
    .getConsents(this.pageNo, this.pageSize, this.sortField, this.sortDir, filter).then((data) => {
      if (data) {
        this.customers = data.content;
        this.totalRecords = data.totalElements;
      }
    });
  }
}
