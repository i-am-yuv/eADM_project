import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  passwordVisible = false;
  isTabletView: boolean = false;

  submitted: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(5)])
    })

    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  toggleFieldTextType() {
    this.passwordVisible = !this.passwordVisible;
  }

  onClickLogin() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login Successfully',
      life: 2000,
    });
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);

  }

  // code for left pannel removal for less than tablet view
  checkScreenSize() {
    this.isTabletView = window.matchMedia('(max-width: 767px)').matches;
  }
}
