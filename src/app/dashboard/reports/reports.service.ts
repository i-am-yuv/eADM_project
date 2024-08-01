import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
   
  apiurl: string = environment.apiurl;

  constructor(private http: HttpClient) {}

  getReports(pageNo: number, pageSize: number, sortField: string, sortDir: string, filter: string) {
    
      var url =
        this.apiurl +
        '/file/all?pageNo=' +
        pageNo +
        '&pageSize=' +
        pageSize +
        '&sortField=' +
        sortField +
        '&sortDir=' +
        sortDir +
        filter;
      return this.http
        .get<any>(url)
        .toPromise()
        .then((data) => {
          return data;
        });
    
  }

}
