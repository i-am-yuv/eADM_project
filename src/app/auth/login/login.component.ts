import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  passwordVisible = false;

  constructor(private router: Router, private formBuilder: FormBuilder)
  { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30),])
    })
  }

  toggleFieldTextType() {
    this.passwordVisible = !this.passwordVisible;
  }

  onClickLogin()
  {
    // alert(JSON.stringify(this.loginForm.value) );
    this.router.navigate(['/home']);
  }

  // code for left pannel removal for less than tablet view
  isTabletView: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkTabletView();
  }

  checkTabletView() {
    this.isTabletView = window.innerWidth < 1000;
  }
}
