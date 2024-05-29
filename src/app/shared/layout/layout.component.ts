import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  // code for left pannel removal for less than tablet view
  // isTabletView: boolean = false;
  sidebarVisible: boolean = false;
  isTabletView : boolean = false;

  ngOnInit()
  {
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.checkTabletView();
  // }

  // checkTabletView() {
  //   this.isTabletView = window.innerWidth < 1000;
  // }

  

}
