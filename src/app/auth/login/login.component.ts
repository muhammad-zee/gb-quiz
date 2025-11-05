import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router

// --- NG-ZORRO IMPORTS ---
// Import all the modules your login HTML uses
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthResponse, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzCheckboxModule,
    NzButtonModule,
    NzAlertModule,
    NzLayoutModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // <-- Fixed to styleUrls (plural) and .css
})
export class LoginComponent implements OnInit {

  // --- Modern Dependency Injection ---
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private title = inject(Title);
  private router = inject(Router); // <-- Use Router for navigation
  private route = inject(ActivatedRoute); // For the returnUrl

  // --- Modern State Management with Signals ---
  formSpinner = signal(false);
  error = signal<string | null>(null);
  passwordVisible = signal(false);
  isMobileView = signal(window.innerWidth <= 1024); // Your logic

  // --- Form Group ---
  loginForm: FormGroup;

  // --- Properties from old component ---
  returnUrl: string | null = null;
  // These properties appear unused in your logic, but are here
  activeColor = '#fbaf3a';
  favouritesColor = '#fdd835';

  constructor() {
    this.title.setTitle('Login');
    // Your form setup, unchanged
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    // Your returnUrl logic, unchanged
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || null;
    });

    // Your "Remember Me" logic, updated to use native localStorage
    // Replaces 'Helpers.empty' and 'localStorage.get'
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

    // Validate form
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

    // Call the AuthService
    this.authService.login(username, password).subscribe({
      next: (resp: AuthResponse) => {
        // On successful login, fetch the user's profile
        this.authService.getProfile().subscribe({
          next: () => {
            this.formSpinner.set(false);
            // Use Angular Router for navigation, not location.href
            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.router.navigate(['/admin']); // Default to admin dashboard
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