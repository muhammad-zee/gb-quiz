import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponse, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private title = inject(Title);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  formSpinner = signal(false);
  error = signal<string | null>(null);
  isMobileView = signal(window.innerWidth <= 1024);
  loginForm: FormGroup;
  returnUrl: string | null = null;
  activeColor = '#fbaf3a';
  favouritesColor = '#fdd835';
  isActivated: boolean = false;
  passwordVisible: boolean = false;

  constructor() {
    this.title.setTitle('Login');
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || null;
    });

    const username = localStorage.getItem('gb_quiz_username');
    if (username) {
      const password = localStorage.getItem('gb_quiz_password');
      this.loginForm.patchValue({
        username: username,
        password: password,
        remember: true
      });
    }
  }

  public login(): void {
    this.error.set(null);

    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.formSpinner.set(true);
    const { username, password, remember } = this.loginForm.value;

    if (remember) {
      this.savePassword(username, password);
    } else {
      this.clearPassword();
    }

    this.authService.login(username, password).subscribe({
      next: (resp: AuthResponse) => {
        this.authService.getProfile().subscribe({
          next: () => {
            this.formSpinner.set(false);
            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.router.navigate(['/admin']);
            }
          },
          error: (profileError) => {
            this.formSpinner.set(false);
            this.error.set('Login successful, but failed to fetch profile.');
          }
        });
      },
      error: (err: Error) => {
        this.formSpinner.set(false);
        this.error.set(err.message || 'Invalid username or password.');
      }
    });
  }

  /**
   * Helper method to save "Remember Me" credentials.
   * Uses native localStorage.
   */
  private savePassword(user: string, pass: string): void {
    localStorage.setItem('gb_quiz_username', user);
    localStorage.setItem('gb_quiz_password', pass);
  }

  /**
   * Helper method to clear "Remember Me" credentials.
   * Uses native localStorage.
   */
  private clearPassword(): void {
    localStorage.removeItem('gb_quiz_username');
    localStorage.removeItem('gb_quiz_password');
  }
}