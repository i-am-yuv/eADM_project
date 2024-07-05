import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiurl: string = environment.apiurl;

  constructor(private http: HttpClient) { }

  async doLogin(credentials: any) {
    var url = this.apiurl + '/auth/authenticate';
    const login = await lastValueFrom(this.http.post<any>(url, credentials));
    return login;
  }

  async signup(data: any) {
    var url = this.apiurl + '/auth/signup';
    const login = await lastValueFrom(this.http.post<any>(url, data));
    return login;
  }
  // async signupwithEmailOrPhone(data: any, flag: boolean) {
  //   if (flag) {
  //     var url = this.apiurl + '/auth/signupByMobile';
  //   } else {
  //     //var url = this.apiurl + '/auth/signup';
  //     var url = this.apiurl + '/auth/signupByMobile';
  //   }
  //   const login = await lastValueFrom(this.http.post<any>(url, data));
  //   return login;
  // }
  async verifyOtp(data: any) {
    var url = this.apiurl + '/auth/verifyotp';
    const verifyOtpResponse = await lastValueFrom(this.http.post<any>(url, data));
    return verifyOtpResponse;
  }

  async sendOtp(data: any) {
    var url = this.apiurl + '/auth/sendotp/';
    const sendOtpResponse = await lastValueFrom(this.http.post<any>(url, data));
    return sendOtpResponse;
  }

  async resendOtp(data: any) {
    var url = this.apiurl + '/auth/resendotp/' + data;
    const sendOtpResponse = await lastValueFrom(this.http.get<any>(url));
    return sendOtpResponse;
  }

  async resetPassword(username: string) {
    var url = this.apiurl + '/auth/resetPassword?username=' + encodeURIComponent(username);
    const reset = await lastValueFrom(this.http.get<any>(url));
    return reset;
  }

  async savePassword(data: any) {
    var url = this.apiurl + '/auth/savePassword';
    const login = await lastValueFrom(this.http.post<any>(url, data));
    return login;
  }
}
