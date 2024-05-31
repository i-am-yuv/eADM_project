import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  newD !: Observable<any>;

  newS = new Subject<any>();

  constructor() { 
    this.newD = this.newS.asObservable();
  }

  getData(data :any )
  {
       this.newS.next(data);
  }
}
