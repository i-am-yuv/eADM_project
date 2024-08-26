import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsentService {

    apiurl: string = environment.apiurl;

    constructor(
      private router: Router,
      private http: HttpClient,
      private msg: MessageService
    ) { }


    
  getConsents(pageNo: number, pageSize: number | undefined, sortField: string | undefined, sortDir: string,filter: string) {
    //console.log(sortField + '\nsdf');
    var url =
    this.apiurl +
    '/consent/all?pageNo=' +
    pageNo +
    '&pageSize=' +
    pageSize +
    '&sortField=' +
    sortField +
    '&sortDir=' +
    sortDir;
  // var url = this.apiurl + '/vendors/all';
  return this.http
    .get<any>(url)
    .toPromise()
    .then((data) => {
      return data;
    });

}
}