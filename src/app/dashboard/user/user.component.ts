import { Component, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { Table } from 'primeng/table';
import { Role, User } from './user';
import { UserService } from './user.service';
import { FilterBuilder } from 'src/app/utils/FilterBuilder';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users!: User[];

  user!: User;
  @ViewChild('dt') dt!: Table;
  date1: Date | undefined;
  uploadUrl = '324324'; // demo URL
  isTabletView: boolean = false;
  sortField: string = '';
  search: string = '';
  pageNo: number = 0;
  pageSize: number = 10;
  sortDir: string = 'DESC';
  totalRecords: any;
  constructor(private userService: UserService, private messageService: MessageService, private layoutService: LayoutService, private router: Router) { }

  ngOnInit() {
    // this.users = [
    //   { userName: "Ramesh", mobileNumber: "123334242342", status: "Active", role: "User" },
    //   { userName: "Suresh", mobileNumber: "123334242343", status: "Active", role: "Admin" },
    //   { userName: "Mahesh", mobileNumber: "123334242344", status: "Inactive", role: "User" },
    //   { userName: "Rajesh", mobileNumber: "123334242345", status: "Active", role: "Admin" },
    //   { userName: "Naresh", mobileNumber: "123334242346", status: "Active", role: "Admin" },
    //   { userName: "Harish", mobileNumber: "123334242347", status: "Inactive", role: "Admin" },
    //   { userName: "Ganesh", mobileNumber: "123334242348", status: "Active", role: "User" },
    //   { userName: "Dinesh", mobileNumber: "123334242349", status: "Active", role: "Admin" },
    //   { userName: "Kiran", mobileNumber: "123334242350", status: "Inactive", role: "User" },
    //   { userName: "Mohan", mobileNumber: "123334242351", status: "Active", role: "Admin" },
    //   { userName: "Ashok", mobileNumber: "123334242352", status: "Active", role: "User" },
    //   { userName: "Vinod", mobileNumber: "123334242353", status: "Inactive", role: "Admin" },
    //   { userName: "Prakash", mobileNumber: "123334242354", status: "Active", role: "User" },
    //   { userName: "Ravi", mobileNumber: "123334242355", status: "Active", role: "Admin" },
    //   { userName: "Karthik", mobileNumber: "123334242356", status: "Inactive", role: "Admin" },
    //   { userName: "Surya", mobileNumber: "123334242357", status: "Active", role: "Admin" },
    //   { userName: "Shiva", mobileNumber: "123334242358", status: "Active", role: "Admin" },
    //   { userName: "Raju", mobileNumber: "123334242359", status: "Inactive", role: "Admin" },
    //   { userName: "Vikas", mobileNumber: "123334242360", status: "Active", role: "User" },
    //   { userName: "Vijay", mobileNumber: "123334242361", status: "Active", role: "Admin" },
    //   { userName: "Rahul", mobileNumber: "123334242362", status: "Inactive", role: "Admin" },
    //   { userName: "Ajay", mobileNumber: "123334242363", status: "Active", role: "Admin" },
    //   { userName: "Arun", mobileNumber: "123334242364", status: "Active", role: "Admin" },
    //   { userName: "Abhishek", mobileNumber: "123334242365", status: "Inactive", role: "Admin" },
    //   { userName: "Anil", mobileNumber: "123334242366", status: "Active", role: "Admin" },
    //   { userName: "Amit", mobileNumber: "123334242367", status: "Active", role: "User" },
    //   { userName: "Suman", mobileNumber: "123334242368", status: "Inactive", role: "Admin" },
    //   { userName: "Naveen", mobileNumber: "123334242369", status: "Active", role: "User" },
    //   { userName: "Manoj", mobileNumber: "123334242370", status: "Active", role: "Admin" },
    //   { userName: "Bharath", mobileNumber: "123334242371", status: "Inactive", role: "Admin" },
    //   { userName: "Deepak", mobileNumber: "123334242372", status: "Active", role: "Admin" },
    //   { userName: "Pavan", mobileNumber: "123334242373", status: "Active", role: "Admin" },
    //   { userName: "Satish", mobileNumber: "123334242374", status: "Inactive", role: "Admin" },
    //   { userName: "Rakesh", mobileNumber: "123334242375", status: "Active", role: "User" },
    //   { userName: "Lokesh", mobileNumber: "123334242376", status: "Active", role: "Admin" },
    //   { userName: "Balaji", mobileNumber: "123334242377", status: "Inactive", role: "Admin" },
    //   { userName: "Sunil", mobileNumber: "123334242378", status: "Active", role: "User" },
    //   { userName: "Vishal", mobileNumber: "123334242379", status: "Active", role: "Admin" },
    //   { userName: "Tarun", mobileNumber: "123334242380", status: "Inactive", role: "User" },
    //   { userName: "Yogesh", mobileNumber: "123334242381", status: "Active", role: "Admin" },
    //   { userName: "Srinivas", mobileNumber: "123334242382", status: "Active", role: "Admin" },
    //   { userName: "Bhaskar", mobileNumber: "123334242383", status: "Inactive", role: "Admin" },
    //   { userName: "Rajiv", mobileNumber: "123334242384", status: "Active", role: "User" },
    //   { userName: "Sathish", mobileNumber: "123334242385", status: "Active", role: "Admin" },
    //   { userName: "Madhav", mobileNumber: "123334242386", status: "Inactive", role: "User" }
    // ];



    //this.layoutService.getData('reports');

    this.checkScreenSize();
   // this.getFilter('');
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

  }

  applyFilterGlobal(event: Event, stringVal: any) {
    // alert(,);
    // this.dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    this.getFilter((event.target as HTMLInputElement).value);
  }
  editUser(user: User) {
    this.user = { ...user };

    if (!this.userstatus.some((option: any) => option.status === this.user.status)) {
      console.error('Status value does not match any option:', this.user.status);
    }
    this.user.status=user.status=='Active'?true:false;
    this.userDialog = true;
    this.submitted=false;
  }

  userDialog!: boolean;
  submitted!: boolean;
  roles: any = [
    { label: 'Active', value: 'Active' },
    { label: 'InActive', value: 'InActive' },
  ];
  userstatus: any = [
    { label: 'SuperAdmin', value: 'SuperAdmin' },
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
  ];

  openNew() {
    this.user = { status:true };
    this.userDialog = true;
    this.submitted = false;
  }
  cancelUser(){
    this.userDialog=false;
    this.submitted=false;
    this.user={};
  }
  changeValue(event: any) {
    this.user.status = event.checked;
    // if (event.checked == true || event.checked == "true") {
    //   this.user.status = "Active"
    // }
    // else if (event.checked == false || event.checked == "false") {
    //   this.user.status = "InActive"
    // }
  }
  createUser(user: User) {

    this.submitted = true;
    if (this.user.mobileNumber?.trim()) {
      if (this.user.id) {
        this.userService.updateUser(this.user).then((res: any) => {
          // this.users.push(res);
          this.users[this.findIndexById(res.id)] = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Updated',
            life: 3000,
          });
        }).catch((e: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: e.error.message,
            life: 3000,
          });
        });
      } else {
        this.userService.createUser(this.user).then((res: any) => {
          this.users.push(res);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Created',
            life: 3000,
          });
        }).catch((e: any) => {
          
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: e.error.message,
            life: 3000,
          });
        });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }





  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  loadPage(event: LazyLoadEvent) {
    this.pageNo = event.first! / 10;
    this.pageSize = event.rows!;
    if (event.sortField) {
      this.sortField = event.sortField;
    }
    this.sortDir = event.sortOrder! > 0 ? 'DESC' : 'ASC';
    
    this.getFilter('');
  }

  getFilter(searchString: string) {

    this.search = searchString;
    var filter = '';
    if (this.search !== '') {
      var filtercols = ['userName', 'email','mobileNumber', 'status', 'role.name'];
      filter = FilterBuilder.build(filtercols, this.search);
    }
    this.userService
      .getUsers(
        this.pageNo,
        this.pageSize,
        this.sortField,
        this.sortDir,
        filter
      )
      .then((data) => {
        if (data) {
          this.users = data.content;

          this.totalRecords = data.totalElements;
        }
      });
    this.userService.getRoles().then((data) => (this.roles = data));
  }

  
}
