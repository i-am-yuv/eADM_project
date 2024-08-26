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

  
  downloadPDF(): void {
    const doc = new jsPDF();
    const col = ['UMR', 'Customer Name', 'Account Number', 'Type of Account', 'Amount', 'Start Date', 'End Date', 'Reason'];
    const rows: any[] = [];

    this.records.forEach(record => {
      const sdate = new Date(record.startDate);
      const edate = new Date(record.endDate); // Changed to endDate
      const temp = [
        record.umr,
        record.customerName,
        record.accountNumber,
        record.typeOfAccount,
        record.amount,
        this.datePipe.transform(sdate, 'dd/MM/yyyy'),
        this.datePipe.transform(edate, 'dd/MM/yyyy'),
        record.reason
      ];
      rows.push(temp);
    });

    autoTable(doc, {
      head: [col],
      body: rows,
      theme: 'striped', // or 'grid'
      headStyles: {
        fillColor: [41, 87, 141], // Dark blue header background
        textColor: [255, 255, 255], // White text
        fontSize: 5,
        fontStyle: 'bold'
      },
      styles: {
        cellPadding: 3,
        fontSize: 5,
        overflow: 'visible',
        halign: 'center',
        valign: 'middle'
      },
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 15 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 15 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 50 }
      },
    });

    doc.save(this.fileName.length == 0 ? "table" : this.fileName + '.pdf');
  }
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
