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
  isTabletView: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder)
  { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30),])
    })

    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
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
  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }
}
