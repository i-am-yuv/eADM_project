import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  currentPage !: Observable<any>;

  currentPageData: BehaviorSubject<any>= new BehaviorSubject<any>(undefined);

  constructor() { 
    this.currentPage = this.currentPageData.asObservable();
  }

  getData(data :any )
  {
       this.currentPageData.next(data);
  }
}
