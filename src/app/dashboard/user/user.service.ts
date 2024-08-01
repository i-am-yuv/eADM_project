import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  users: string[] = [];
  apiurl: string = environment.apiurl;

  constructor(private http: HttpClient) {}


  getRoles() {
    var url = this.apiurl + '/roles/all';
    return this.http
      .get<any>(url)
      .toPromise()
      .then((data) => {
        return data.content;
      });
  }
  getUser(userId: string) {
    var url = this.apiurl + '/user/get/' + encodeURIComponent(userId!);
    return this.http
      .get<any>(url)
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  
  getUsers(
    pageNo: number,
    pageSize: number,
    sortField: any,
    sortDir: any,
    filter: string
  ) {
    var url =
      this.apiurl +
      '/user/all?pageNo=' +
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

  createUser(user: User) {
    var url = this.apiurl + '/user/create';
    return (
      this.http
        .post<any>(url, user)
        .toPromise()
        // .then(res => <User>res.data)
        .then((data) => {
          return data;
        })
    );
  }

  updateUser(user: User) {
    var url = this.apiurl + '/user/update/' + encodeURIComponent(user.id!);
    return (
      this.http
        .put<any>(url, user)
        .toPromise()
        // .then(res => <User>res.data)
        .then((data) => {
          return data;
        })
    );
  }

  deleteUser(user: User) {
    var url = this.apiurl + '/user/delete/' + encodeURIComponent(user.id!);
    return (
      this.http
        .delete<any>(url)
        .toPromise()
        // .then(res => <User>res.data)
        .then((data) => {
          return data;
        })
    );
  }
}
