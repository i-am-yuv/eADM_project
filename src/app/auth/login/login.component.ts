import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  passwordVisible = false;
  isTabletView: boolean = false;
  captchaText:string="CAPTCHA";
  submitted: boolean = false;

  constructor(private loginService:LoginService,private router: Router, private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.generateCaptcha();
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]),
      captcha:new FormControl('', []),
    })

    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  toggleFieldTextType() {
    this.passwordVisible = !this.passwordVisible;
  }

  generateCaptcha(){
    let uniquechar = "";

    const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i < 6; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
    this.captchaText=uniquechar;
  }
  onClickLogin() {
    var captcha=this.loginForm.get('captcha')?.value;
    if(captcha!=this.captchaText){
      this.messageService.add({
        severity: 'error',
        summary: 'Login Error',
        detail: 'Invalid Captcha',
        life: 3000,
      });
      return ;
    }

    this.submitted = true;
    // this.router.navigate(['/dashboard']);
    // alert(JSON.stringify(this.loginForm.value));
    this.loginService.doLogin(this.loginForm.value).then((res:any) => {
      if (res) {
        sessionStorage.setItem('token', res.jwt);
        sessionStorage.setItem('refreshToken', res.refreshToken);

        this.messageService.add({
          severity: 'success',
          summary: 'Login Success',
          detail: 'Login Successful',
          life: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
    
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Error',
          detail: 'Invalid Login, please check credentials',
          life: 3000,
        });
        this.submitted = false;
      }
    })
      .catch((err:any) => {
        if (err.status === 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: 'Check Server Connection',
            life: 3000,
          });
        }
        else if (err.code === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: 'Check Server Connection',
            life: 3000,
          });
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: err.error.message,
            life: 3000,
          });

          if (err.error.message.includes('User is Inactive')) {
            // this.showOtpFlag = true;
            // this.verifyOtpMobile = this.loginForm.controls['username'].value;
          }
        }
        this.submitted = false;
      });
   
    
  }

  // code for left pannel removal for less than tablet view
  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }
}
