import { Component } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/shared/layout/layout.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users!: User[];

  date1: Date | undefined;
  uploadUrl = '324324'; // demo URL
  isTabletView: boolean = false;

  constructor(private messageService: MessageService, private layoutService: LayoutService,private router:Router) { }

  ngOnInit() {
    this.users = [
      { userName: "Ramesh", phoneNumber: "123334242342", status: "active", role: "user" },
      { userName: "Suresh", phoneNumber: "123334242343", status: "active", role: "admin" },
      { userName: "Mahesh", phoneNumber: "123334242344", status: "inactive", role: "user" },
      { userName: "Rajesh", phoneNumber: "123334242345", status: "active", role: "admin" },
      { userName: "Naresh", phoneNumber: "123334242346", status: "active", role: "admin" },
      { userName: "Harish", phoneNumber: "123334242347", status: "inactive", role: "admin" },
      { userName: "Ganesh", phoneNumber: "123334242348", status: "active", role: "user" },
      { userName: "Dinesh", phoneNumber: "123334242349", status: "active", role: "admin" },
      { userName: "Kiran", phoneNumber: "123334242350", status: "inactive", role: "user" },
      { userName: "Mohan", phoneNumber: "123334242351", status: "active", role: "admin" },
      { userName: "Ashok", phoneNumber: "123334242352", status: "active", role: "user" },
      { userName: "Vinod", phoneNumber: "123334242353", status: "inactive", role: "admin" },
      { userName: "Prakash", phoneNumber: "123334242354", status: "active", role: "user" },
      { userName: "Ravi", phoneNumber: "123334242355", status: "active", role: "admin" },
      { userName: "Karthik", phoneNumber: "123334242356", status: "inactive", role: "admin" },
      { userName: "Surya", phoneNumber: "123334242357", status: "active", role: "admin" },
      { userName: "Shiva", phoneNumber: "123334242358", status: "active", role: "admin" },
      { userName: "Raju", phoneNumber: "123334242359", status: "inactive", role: "admin" },
      { userName: "Vikas", phoneNumber: "123334242360", status: "active", role: "user" },
      { userName: "Vijay", phoneNumber: "123334242361", status: "active", role: "admin" },
      { userName: "Rahul", phoneNumber: "123334242362", status: "inactive", role: "admin" },
      { userName: "Ajay", phoneNumber: "123334242363", status: "active", role: "admin" },
      { userName: "Arun", phoneNumber: "123334242364", status: "active", role: "admin" },
      { userName: "Abhishek", phoneNumber: "123334242365", status: "inactive", role: "admin" },
      { userName: "Anil", phoneNumber: "123334242366", status: "active", role: "admin" },
      { userName: "Amit", phoneNumber: "123334242367", status: "active", role: "user" },
      { userName: "Suman", phoneNumber: "123334242368", status: "inactive", role: "admin" },
      { userName: "Naveen", phoneNumber: "123334242369", status: "active", role: "user" },
      { userName: "Manoj", phoneNumber: "123334242370", status: "active", role: "admin" },
      { userName: "Bharath", phoneNumber: "123334242371", status: "inactive", role: "admin" },
      { userName: "Deepak", phoneNumber: "123334242372", status: "active", role: "admin" },
      { userName: "Pavan", phoneNumber: "123334242373", status: "active", role: "admin" },
      { userName: "Satish", phoneNumber: "123334242374", status: "inactive", role: "admin" },
      { userName: "Rakesh", phoneNumber: "123334242375", status: "active", role: "user" },
      { userName: "Lokesh", phoneNumber: "123334242376", status: "active", role: "admin" },
      { userName: "Balaji", phoneNumber: "123334242377", status: "inactive", role: "admin" },
      { userName: "Sunil", phoneNumber: "123334242378", status: "active", role: "user" },
      { userName: "Vishal", phoneNumber: "123334242379", status: "active", role: "admin" },
      { userName: "Tarun", phoneNumber: "123334242380", status: "inactive", role: "user" },
      { userName: "Yogesh", phoneNumber: "123334242381", status: "active", role: "admin" },
      { userName: "Srinivas", phoneNumber: "123334242382", status: "active", role: "admin" },
      { userName: "Bhaskar", phoneNumber: "123334242383", status: "inactive", role: "admin" },
      { userName: "Rajiv", phoneNumber: "123334242384", status: "active", role: "user" },
      { userName: "Sathish", phoneNumber: "123334242385", status: "active", role: "admin" },
      { userName: "Madhav", phoneNumber: "123334242386", status: "inactive", role: "user" }
    ];
    
    
  
    //this.layoutService.getData('reports');

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

    // this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
    if (searchString.length > 0) {
      //this.search = searchString;
      //this.getFilter(searchString);
    }
    else {
      //this.getFilter(searchString);
    }
  }
  editUser(user:User){

  }
}
