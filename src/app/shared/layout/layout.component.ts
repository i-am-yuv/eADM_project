import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LayoutService } from './layout.service';

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

  currentPage !: string ;
  constructor(private router : Router , private layoutS : LayoutService)
  {}

  ngOnInit()
  {
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });

      this.layoutS.currentPageData.subscribe(
        (res)=>{
          // alert(res);
            this.currentPage=res;
        },
        (err)=>{
           this.currentPage = 'home';
        }
      )
  }

  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }

  navigation( path: string)
  {
      if( path == 'home')
        {
           this.router.navigate(['/home']);
           this.sidebarVisible = false;
        }
        else if(path == 'reports')
          {
            this.router.navigate(['/home/reports']);
            this.sidebarVisible = false;
          }
          else if(path=='consent'){
            this.router.navigate(['/home/consent']);
            this.sidebarVisible = false;
          }
          else if(path=='user'){
            this.router.navigate(['/home/user']);
            this.sidebarVisible = false;
          }
  }

}
