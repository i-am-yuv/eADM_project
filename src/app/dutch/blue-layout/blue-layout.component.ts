import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-blue-layout',
  templateUrl: './blue-layout.component.html',
  styleUrls: ['./blue-layout.component.scss'],
})
export class BlueLayoutComponent implements OnInit {
  items!: MenuItem[];
  userMenuItems!: MenuItem[];

  userrole: string = 'user';
  username: string = '';
  optionalMenu!: MenuItem[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userrole = this.authService.getRoles();
    this.username = this.authService.getUserName();


    var userMenu = {};


    this.items = [
      {
        label: 'Quick Links',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
          },
          // {
          //   label: 'Marketplace',
          //   icon: 'pi pi-fw pi-sun',
          //   routerLink: ['/dashboard'],
          // },
        ],
      },
    ];
    this.optionalMenu.forEach((itm: any) => {
      this.items.push(itm);
    });
    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        items: [
          {
            label:
              '<div class="small-heading">Username</div> ' +
              this.username.toUpperCase(),
            escape: false,
            icon: 'pi pi-user',
          },
          {
            label: '<div class="small-heading">Roles</div> ' + this.userrole,
            escape: false,
            icon: 'pi pi-users',
          },
          {
            label: 'My Account',
            icon: 'pi pi-user-edit',
            routerLink: ['/settings'],
          },
        ],
      },

      {
        label: 'Settings',
        routerLink: ['/settings'],
        icon: 'pi pi-fw pi-cog',
      },
      {
        label: 'Notifications',
        routerLink: ['/settings/notifications'],
        icon: 'pi pi-fw pi-bell',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['/'],
        command: () => sessionStorage.clear(),
      },
    ];
  }
}
