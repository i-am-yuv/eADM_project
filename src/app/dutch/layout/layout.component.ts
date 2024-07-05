import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { LedgerTypeComponent } from 'src/app/masters/ledger-type/ledger-type.component';
import { LedgerComponent } from 'src/app/masters/ledger/ledger.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  items!: MenuItem[];
  itemsClosed !: MenuItem[];

  userMenuItems!: MenuItem[];

  itemss!: MegaMenuItem[];
  userMenuItemss!: MegaMenuItem[];

  userrole: string = 'user';
  username: string = '';
  currentOrg: string = 'data';
  salesCredit: string = '';
  purchaseCredit: string = '';
  optionalMenu!: MenuItem[];
  position: string = 'left';

  isDashboardPages: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });

    this.itemss = [
      {
        label: 'Videos',
        icon: 'pi pi-fw pi-video',
        items: [
          [
            {
              label: 'Video 1',
              items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }],
            },
            {
              label: 'Video 2',
              items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }],
            },
          ],
          [
            {
              label: 'Video 3',
              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }],
            },
            {
              label: 'Video 4',
              items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }],
            },
          ],
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        items: [
          [
            {
              label: 'User 1',
              items: [{ label: 'User 1.1' }, { label: 'User 1.2' }],
            },
            {
              label: 'User 2',
              items: [{ label: 'User 2.1' }, { label: 'User 2.2' }],
            },
          ],
          [
            {
              label: 'User 3',
              items: [{ label: 'User 3.1' }, { label: 'User 3.2' }],
            },
            {
              label: 'User 4',
              items: [{ label: 'User 4.1' }, { label: 'User 4.2' }],
            },
          ],
          [
            {
              label: 'User 5',
              items: [{ label: 'User 5.1' }, { label: 'User 5.2' }],
            },
            {
              label: 'User 6',
              items: [{ label: 'User 6.1' }, { label: 'User 6.2' }],
            },
          ],
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          [
            {
              label: 'Event 1',
              items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }],
            },
            {
              label: 'Event 2',
              items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }],
            },
          ],
          [
            {
              label: 'Event 3',
              items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }],
            },
            {
              label: 'Event 4',
              items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }],
            },
          ],
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Setting 1',
              items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }],
            },
            {
              label: 'Setting 2',
              items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }],
            },
            {
              label: 'Setting 3',
              items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }],
            },
          ],
          [
            {
              label: 'Technology 4',
              items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }],
            },
          ],
        ],
      },
    ];

    this.userrole = this.authService.getRoles();
    this.username = this.authService.getUserName();

    this.getUserMenuItems();
    var superAdminMenu = {
      label: 'Admin',
      icon: 'pi pi-fw pi-user',
      items: [
        // {
        //   label: 'Vendors', icon: 'pi pi-fw pi-sun',
        //   routerLink: ['/admin/vendors']
        // },

        {
          label: 'Roles',
          icon: 'pi pi-fw pi-key',
          routerLink: ['/admin/roles'],
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-users',
          routerLink: ['/admin/users'],
        },
        {
          label: 'Privileges',
          icon: 'pi pi-fw pi-users',
          routerLink: ['/admin/privileges'],
        },
        // {
        //   label: 'Settings',
        //   icon: 'pi pi-fw pi-file',
        //   routerLink: ['/admin/settings'],
        // },
      ],
    };

    /* sub masters*/
    // var masterMenu = {
    //   label: 'Masters',
    //   icon: 'pi pi-fw pi-sitemap',
    //   //routerLink: ['/setup-masters/'],
    //   items: [
    //     {
    //       label: 'Company',
    //       icon: 'pi pi-fw pi-building',
    //       items: [
    //         // {
    //         //   label: 'Companies',
    //         //   icon: 'pi pi-fw pi-globe',
    //         //   routerLink: ['/masters/companies'],
    //         // },
    //         {
    //           label: 'Company Master',
    //           icon: 'pi pi-fw pi-globe',
    //           items: [
    //             {
    //               label: 'Vendor',
    //               icon: 'pi  pi-user',
    //               routerLink: ['/masters/vendor'],
    //             },
    //             {
    //               label: 'Credit Note',
    //               icon: 'pi pi-user-plus',
    //               routerLink: ['/masters/vendor-credit'],
    //             },
    //             {
    //               label: 'Receipts',
    //               icon: 'pi pi-fw pi-file',
    //               routerLink: ['/masters/bill'],
    //             },
    //             {
    //               label: 'Customer',
    //               icon: 'pi  pi-user',
    //               routerLink: ['/masters/customer'],
    //             },
    //             {
    //               label: 'Credit Note',
    //               icon: 'pi pi-user-plus',
    //               routerLink: ['/masters/customer-credit'],
    //             },
    //             {
    //               label: 'Invoice',
    //               icon: 'pi pi-fw pi-file',
    //               routerLink: ['/masters/invoice'],
    //             },
    //           ],
    //         },
    //         {
    //           label: 'Currency',
    //           icon: 'pi pi-fw pi-dollar',
    //           routerLink: ['/masters/currency'],
    //         },
    //         {
    //           label: 'Branch',
    //           icon: 'pi pi-fw pi-sitemap',
    //           routerLink: ['/masters/organization'],
    //         },
    //         // {
    //         //   label: 'Vendor',
    //         //   icon: 'pi pi-fw pi-users',
    //         //   routerLink: ['/masters/vendor'],
    //         // },
    //         // {
    //         //   label: 'Customer',
    //         //   icon: 'pi pi-fw pi-users',
    //         //   routerLink: ['/masters/customer'],
    //         // },
    //         {
    //           label: 'ChartOfAccounts',
    //           icon: 'pi  pi-bars',
    //           items: [
    //             {
    //               label: 'COA Group',
    //               icon: 'pi  pi-align-justify',
    //               routerLink: ['/masters/coa-group'],
    //             },
    //             // {
    //             //   label: 'COA Sub Group',
    //             //   icon: 'pi pi-fw pi-file',
    //             //   routerLink: ['/masters/coa-sub-group'],
    //             //},
    //             {
    //               label: 'COA Account',
    //               icon: 'pi pi-fw pi-wallet',
    //               routerLink: ['/masters/coa-account'],
    //             },
    //           ],
    //         },

    //         // {
    //         //   label: 'Sales',
    //         //   icon: 'pi  pi-tags',
    //         //   items: [
    //         //     {
    //         //       label: 'Customer',
    //         //       icon: 'pi  pi-user',
    //         //       routerLink: ['/masters/customer'],
    //         //     },
    //         //     {
    //         //       label: 'Customer Credit',
    //         //       icon: 'pi pi-user-plus',
    //         //       routerLink: ['/masters/customer-credit'],
    //         //     },
    //         //     {
    //         //       label: 'Invoice',
    //         //       icon: 'pi pi-fw pi-file',
    //         //       routerLink: ['/masters/invoice'],
    //         //     },
    //         //   ],
    //         // },
    //         {
    //           label: 'Bank Accounts',
    //           icon: 'pi pi-wallet',
    //           routerLink: ['/masters/bankaccount'],
    //         },
    //       ],
    //     },

    //     {
    //       label: 'Tax',
    //       icon: 'pi  pi-briefcase',
    //       items: [
    //         {
    //           label: 'TDS',
    //           icon: 'pi  pi-book',
    //           routerLink: ['/masters/tds'],
    //         },
    //         {
    //           label: 'TCS',
    //           icon: 'pi  pi-book',
    //           routerLink: ['/masters/tcs'],
    //         },
    //         {
    //           label: 'GST',
    //           icon: 'pi pi-fw pi-book',
    //           routerLink: ['/masters/gst'],
    //         },
    //       ],
    //     },
    //     // {
    //     //   label: 'mock',
    //     //   icon: 'pi pi-fw pi-file',
    //     //   routerLink: ['/masters/mock'],
    //     // },
    //     {
    //       label: 'Address',
    //       icon: 'pi pi-fw pi-map-marker',
    //       items: [
    //         {
    //           label: 'Address',
    //           icon: 'pi pi-fw pi-map-marker',
    //           routerLink: ['/masters/address'],
    //         },
    //         {
    //           label: 'Countries',
    //           icon: 'pi pi-fw pi-map-marker',
    //           routerLink: ['/masters/countries'],
    //         },
    //         {
    //           label: 'States',
    //           icon: 'pi pi-fw pi-map-marker',
    //           routerLink: ['/masters/states'],
    //         },
    //       ],
    //     },

    //     {
    //       label: 'Calendar',
    //       icon: 'pi pi-fw pi-calendar',
    //       routerLink: ['/masters/calendar'],
    //     },

    //     {
    //       label: 'Reports',
    //       icon: 'pi pi-fw pi-file',
    //       routerLink: ['/masters/reports'],
    //       // items: [
    //       //   {
    //       //     label: 'P/L',
    //       //     icon: 'pi pi-fw pi-file',
    //       //     routerLink: ['/masters/reports'],
    //       //   },
    //       //   {
    //       //     label: 'BalanceSheet',
    //       //     icon: 'pi pi-fw pi-file',
    //       //     routerLink: ['/masters/address'],
    //       //   },
    //       // ]

    //       //routerLink: ['/masters/reports'],
    //     },
    //   ],
    // };

    /* old masters*/
    var masterMenu = {
      label: 'Masters',
      icon: 'pi pi-fw pi-sitemap',
      items: [
        {
          label: 'Branches',
          icon: 'pi pi-fw pi-sitemap',
          routerLink: ['/masters/organization'],
        },
        {
          label: 'Vendors',
          icon: 'pi  pi-user',
          routerLink: ['/masters/vendor'],
        },
        {
          label: 'Customers',
          icon: 'pi  pi-user',
          routerLink: ['/masters/customer'],
        },
        {
          label: 'Currencies',
          icon: 'pi pi-fw pi-dollar',
          routerLink: ['/masters/currency'],
        },
        {
          label: 'Countries',
          icon: 'pi pi-fw pi-map-marker',
          routerLink: ['/masters/countries'],
        },
        {
          label: 'States',
          icon: 'pi pi-fw pi-map-marker',
          routerLink: ['/masters/states'],
        },
        {
          label: 'Address',
          icon: 'pi pi-fw pi-map-marker',
          routerLink: ['/masters/address'],
        },
        {
          label: 'Bank Accounts',
          icon: 'pi pi-wallet',
          routerLink: ['/masters/bankaccount'],
        },
        {
          label: 'GST',
          icon: 'pi pi-fw pi-book',
          routerLink: ['/masters/gst'],
        },
        {
          label: 'TDS Masters',
          icon: 'pi  pi-globe',
          // routerLink: ['/masters/tds'],
          items: [
            // {
            //   label: 'VendorType',
            //   icon: 'pi pi-fw pi-book',
            //   routerLink: ['/masters/tds-vendor'],
            // },
            {
              label: 'Payment Types',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/masters/tds-payment'],
            },
            {
              label: 'Constitution Types',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/masters/tds-cons'],
            },
            {
              label: 'TDS Sections',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/masters/tds-tdssection'],
            },
            {
              label: 'TDS Rates',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/masters/tds-master'],
            },
            {
              label: 'SurCess  Charges',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/masters/tds-cess'],
            },
            {
              label: 'TDS Recovery',
              icon: 'pi pi-fw pi-book',
              routerLink: ['/masters/tds-recovery'],
            },
            // {
            //   label: 'Mock',
            //   icon: 'pi pi-fw pi-code',
            //   routerLink: ['/masters/mock'],
            // },
          ],
        },
        // {
        //   label: 'TCS',
        //   icon: 'pi  pi-book',
        //   routerLink: ['/masters/tcs'],
        // },

      ],
    };

    var reports = {
      label: 'Reports',
      icon: 'pi pi-fw pi-file',
      routerLink: ['/masters/reports'],
    };

    var home = {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: ['/dashboard'],
    };

    // var setup = {

    //   label: 'Configurations',
    //   icon: 'pi pi-cog',
    //   routerLink: ['/settings/account-config'],

    // }

    var accountConfig = {
      label: 'Accounts',
      icon: 'pi pi-fw pi-lock',
      items: [
        // {
        //   label: 'Financial Accounts',
        //   icon: 'pi pi-lock',
        //   routerLink: ['/masters/financialaccount'],
        // },
        // {
        //   label: 'Default Accounts',
        //   icon: 'pi pi-lock',
        //   routerLink: ['/masters/defaultaccount'],
        // },
        {
          label: 'Calendar',
          icon: 'pi pi-fw pi-calendar',
          routerLink: ['/masters/calendar'],
        },
        {
          label: 'Chart Of Accounts',
          icon: 'pi pi-fw pi-lock',
          routerLink: ['/masters/coa-account'],
        },
        {
          label: 'Period Control',
          icon: 'pi pi-fw pi-clock',
          routerLink: ['/masters/periodcontrol'],
        },
        {
          label: 'Period',
          icon: 'pi pi-fw pi-clock',
          routerLink: ['/masters/period'],
        },
        {
          label: 'Year',
          icon: 'pi pi-fw pi-calendar',
          routerLink: ['/masters/year'],
        },
      ],
    };
    var transactions = {
      label: 'Transactions',
      icon: 'pi pi-fw pi-credit-card',
      items: [
        // {
        //   label: 'Ledger',
        //   icon: 'pi  pi-book',
        //   items: [
        //     {
        //       label: 'Books',
        //       icon: 'pi pi-book',
        //       routerLink: ['/masters/ledgers'],
        //     },

        //   ],
        // },
        {
          label: 'Ledger',
          icon: 'pi pi-book',
          routerLink: ['/masters/ledger-type'],
        },
        {
          label: 'Journal',
          icon: 'pi pi-fw pi-file',
          routerLink: ['/masters/journal'],
        },

        {
          label: 'Receipts',
          icon: 'pi pi-fw pi-file',
          routerLink: ['/masters/bill'],
        },

        {
          label: 'Invoice',
          icon: 'pi pi-fw pi-file',
          routerLink: ['/masters/invoice'],
        },
        {
          label: 'Delivery Challan',
          icon: 'pi pi-fw pi-file',
          routerLink: ['/masters/dc'],
        },
        {
          label: 'Credit Notes',
          icon: 'pi pi-user-plus',
          routerLink: ['/masters/vendor-credit'],
        },
        {
          label: 'TDS Certificates',
          icon: 'pi pi-fw pi-book',
          routerLink: ['/masters/tds-certificate'],
        },
      ],
    };

    var userMenu = {};

    // var banking = {
    //   label: 'Banking',
    //   icon: 'pi pi-briefcase',
    //   items: [
    //     {
    //       label: 'Beneficiaries',
    //       icon: 'pi pi-users',
    //       routerLink: ['/banking/beneficiary'],
    //     },
    //     {
    //       label: 'Payments',
    //       icon: 'pi pi-money-bill',
    //       routerLink: ['/banking/payments'],
    //     }
    //   ],
    // }

    this.optionalMenu = [
      home,

      masterMenu,
      accountConfig,
      transactions,
      superAdminMenu,
      //banking,
      reports
    ];

    this.items = [
      // {
      //   label: 'Home',
      //   icon: 'pi pi-fw pi-home',
      //   routerLink: ['/dashboard'],
      // },
      // {
      //   label: 'Marketplace',
      //   icon: 'pi pi-fw pi-sun',
      //   routerLink: ['/dashboard'],
      // },
    ];
    this.optionalMenu.forEach((itm: any) => {
      this.items.push(itm);
    });
  }

  getUserMenuItems() {
    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        // items: [
        //   {
        //     label:
        //       '<div class="small-heading">Username</div> ' +
        //       this.username.toUpperCase(),
        //     escape: false,
        //     icon: 'pi pi-users',
        //   },
        //   {
        //     label: '<div class="small-heading">Roles</div> ' + this.userrole,
        //     escape: false,
        //     icon: 'pi pi-key',
        //   },
        //   {
        //     label: 'My Account',
        //     icon: 'pi pi-user-edit',
        //     routerLink: ['/settings'],
        //   },
        // ],
        disabled: true, // Adding disabled property
        routerLink: ['/settings']
      },
      {
        label: 'Configuration',
        icon: 'pi pi-cog',
        routerLink: ['/settings/account-config'],

      },
      {
        label: 'Settings',
        routerLink: ['/settings'],
        icon: 'pi pi-fw pi-cog',
      },
      // {
      //   label: 'Notifications',
      //   routerLink: ['/settings/notifications'],
      //   icon: 'pi pi-fw pi-bell',
      // },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['/'],
        command: () => sessionStorage.clear(),
      },
    ];
  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // slide bar
  isMobile: boolean = false;
  isVisibleSlideBar1: boolean = false;
  isVisibleSlideBar2: boolean = false;


  openMobileSlidebar1() {
    this.isVisibleSlideBar1 = true;
    this.isVisibleSlideBar2 = false;

  }
  openMobileSlidebar2() {
    this.isVisibleSlideBar1 = false;
    this.isVisibleSlideBar2 = true;
  }

  checkScreenSize() {
    this.isMobile = window.matchMedia('(max-width: 767px)').matches;
  }
}
