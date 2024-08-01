import { ChangeDetectorRef, Component } from '@angular/core';
import { Record } from '../model';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  records!: Record[];

  date1: Date | undefined;
  uploadUrl = environment.apiurl + '/account/validate'; // demo URL
  isTabletView: boolean = false;

  fileForm!: FormGroup;
  selectedFile: File | null = null;
  fileName: string = '';

  constructor(private datePipe: DatePipe, private messageService: MessageService, private layoutService: LayoutService, private fb: FormBuilder) { }

  ngOnInit() {

    this.fileForm = this.fb.group({
      file: [null, [Validators.required]]
    });

    // this.records = [
    //   { startDate: '01/01/23', accountNumber: '1234567890123456', status: 'Approved' },
    //   { date: '02/01/23', accountNumber: '2345678901234567', status: 'Rejected' },
    //   { date: '03/01/23', accountNumber: '3456789012345678', status: 'Approved' },
    //   { date: '04/01/23', accountNumber: '4567890123456789', status: 'Rejected' },
    //   { date: '05/01/23', accountNumber: '5678901234567890', status: 'Approved' },
    //   { date: '06/01/23', accountNumber: '6789012345678901', status: 'Rejected' },
    //   { date: '07/01/23', accountNumber: '7890123456789012', status: 'Approved' },
    //   { date: '08/01/23', accountNumber: '8901234567890123', status: 'Rejected' },
    //   { date: '09/01/23', accountNumber: '9012345678901234', status: 'Approved' },
    //   { date: '10/01/23', accountNumber: '0123456789012345', status: 'Rejected' },
    //   { date: '11/01/23', accountNumber: '1234567890123456', status: 'Approved' },
    //   { date: '12/01/23', accountNumber: '2345678901234567', status: 'Rejected' },
    //   { date: '13/01/23', accountNumber: '3456789012345678', status: 'Approved' },
    //   { date: '14/01/23', accountNumber: '4567890123456789', status: 'Rejected' },
    //   { date: '15/01/23', accountNumber: '5678901234567890', status: 'Approved' },
    //   { date: '16/01/23', accountNumber: '6789012345678901', status: 'Rejected' },
    //   { date: '17/01/23', accountNumber: '7890123456789012', status: 'Approved' },
    //   { date: '18/01/23', accountNumber: '8901234567890123', status: 'Rejected' },
    //   { date: '19/01/23', accountNumber: '9012345678901234', status: 'Approved' },
    //   { date: '20/01/23', accountNumber: '0123456789012345', status: 'Rejected' },
    //   { date: '21/01/23', accountNumber: '1234567890123456', status: 'Approved' },
    //   { date: '22/01/23', accountNumber: '2345678901234567', status: 'Rejected' },
    //   { date: '23/01/23', accountNumber: '3456789012345678', status: 'Approved' },
    //   { date: '24/01/23', accountNumber: '4567890123456789', status: 'Rejected' },
    //   { date: '25/01/23', accountNumber: '5678901234567890', status: 'Approved' },
    //   { date: '26/01/23', accountNumber: '6789012345678901', status: 'Rejected' },
    //   { date: '27/01/23', accountNumber: '7890123456789012', status: 'Approved' },
    //   { date: '28/01/23', accountNumber: '8901234567890123', status: 'Rejected' },
    //   { date: '29/01/23', accountNumber: '9012345678901234', status: 'Approved' },
    //   { date: '30/01/23', accountNumber: '0123456789012345', status: 'Rejected' },
    //   { date: '31/01/23', accountNumber: '1234567890123456', status: 'Approved' },
    //   { date: '01/02/23', accountNumber: '2345678901234567', status: 'Rejected' },
    //   { date: '02/02/23', accountNumber: '3456789012345678', status: 'Approved' },
    //   { date: '03/02/23', accountNumber: '4567890123456789', status: 'Rejected' },
    //   { date: '04/02/23', accountNumber: '5678901234567890', status: 'Approved' },
    //   { date: '05/02/23', accountNumber: '6789012345678901', status: 'Rejected' },
    //   { date: '06/02/23', accountNumber: '7890123456789012', status: 'Approved' },
    //   { date: '07/02/23', accountNumber: '8901234567890123', status: 'Rejected' },
    //   { date: '08/02/23', accountNumber: '9012345678901234', status: 'Approved' },
    //   { date: '09/02/23', accountNumber: '0123456789012345', status: 'Rejected' },
    //   { date: '10/02/23', accountNumber: '1234567890123456', status: 'Approved' },
    //   { date: '11/02/23', accountNumber: '2345678901234567', status: 'Rejected' },
    //   { date: '12/02/23', accountNumber: '3456789012345678', status: 'Approved' },
    //   { date: '13/02/23', accountNumber: '4567890123456789', status: 'Rejected' },
    //   { date: '14/02/23', accountNumber: '5678901234567890', status: 'Approved' },
    //   { date: '15/02/23', accountNumber: '6789012345678901', status: 'Rejected' },
    //   { date: '16/02/23', accountNumber: '7890123456789012', status: 'Approved' },
    //   { date: '17/02/23', accountNumber: '8901234567890123', status: 'Rejected' },
    //   { date: '18/02/23', accountNumber: '9012345678901234', status: 'Approved' },
    //   { date: '19/02/23', accountNumber: '0123456789012345', status: 'Rejected' },
    // ];

    this.layoutService.getData('home');
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  first: number = 0;
  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }



  // code for left pannel removal for less than tablet view
  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }

  
  // downloadPDF(): void {
  //   const doc = new jsPDF();
  //   const col = ['UMR', 'Customer Name', 'Account Number', 'Type of Account', 'Amount', 'Start Date', 'End Date', 'Reason'];
  //   const rows: any[] = [];

  //   this.records.forEach(record => {
  //     const sdate = new Date(record.startDate);
  //     const edate = new Date(record.endDate); // Changed to endDate
  //     const temp = [
  //       record.umr,
  //       record.customerName,
  //       record.accountNumber,
  //       record.typeOfAccount,
  //       record.amount,
  //       this.datePipe.transform(sdate, 'dd/MM/yyyy'),
  //       this.datePipe.transform(edate, 'dd/MM/yyyy'),
  //       record.reason
  //     ];
  //     rows.push(temp);
  //   });

  //   autoTable(doc, {
  //     head: [col],
  //     body: rows,
  //     theme: 'striped', // or 'grid'
  //     headStyles: {
  //       fillColor: [41, 87, 141], // Dark blue header background
  //       textColor: [255, 255, 255], // White text
  //       fontSize: 8,
  //       fontStyle: 'bold'
  //     },
  //     styles: {
  //       cellPadding: 5,
  //       fontSize: 8,
  //       overflow: 'linebreak',
  //       halign: 'center',
  //       valign: 'middle'
  //     },
  //     margin: { top: 20 },
  //     columnStyles: {
  //       0: { cellWidth: 20 },
  //       1: { cellWidth: 30 },
  //       2: { cellWidth: 30 },
  //       3: { cellWidth: 30 },
  //       4: { cellWidth: 20 },
  //       5: { cellWidth: 30 },
  //       6: { cellWidth: 30 },
  //       7: { cellWidth: 50 }
  //     },
  //   });

  //   doc.save(this.fileName.length == 0 ? "table" : this.fileName + '.pdf');
  // }
  isvalidFileRecords: boolean = true;

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size exceeds 10MB');
        this.fileForm.reset();
        this.fileName = '';
        return;
      }
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') { // Check for xlsx
        alert('Please upload only XLSX files');
        this.fileForm.reset();
        this.fileName = '';
        return;
      }
      this.selectedFile = file;
      this.fileName = file.name;

    }
  }
  isUploading: boolean = false;
  isuploadProgress: boolean = false;
  uploadFile() {
    if (this.selectedFile) {
      this.isuploadProgress = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.isUploading = true;
      this.layoutService.uploadFile(formData).then((res) => {
        if (res.status) {
          this.isvalidFileRecords = res.status;
          this.records = res.bulkuploadRequest;
          this.isUploading = false;
        } else {
          this.isUploading = false;
          this.isvalidFileRecords = false;
          this.records = res.bulkuploadRequest;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message
          })
        }
      }).catch((e) => {
        this.isUploading = false;
        this.isvalidFileRecords = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error Occured'
        })
      });
    }
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
