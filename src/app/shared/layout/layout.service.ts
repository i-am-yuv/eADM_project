import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
 

  currentPage !: Observable<any>;

  currentPageData: BehaviorSubject<any>= new BehaviorSubject<any>(undefined);
apiUrl:string=environment.apiurl;
  constructor(private http:HttpClient) { 
    this.currentPage = this.currentPageData.asObservable();
  }

  getData(data :any )
  {
       this.currentPageData.next(data);
  }


  
  uploadFile(formData: FormData): Promise<any> {
    var uploadUrl=this.apiUrl+'/process-bulk-file'
    return this.http.post(uploadUrl, formData).toPromise();
  }
}
