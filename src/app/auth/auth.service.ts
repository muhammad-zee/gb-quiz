import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, lastValueFrom } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  profile?: UserProfile;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  permissions: string[]; // For the 'canAccess' function
  access_type?: string; // For getUserType
}

// The API response for getProfile()
export interface ProfileResponse {
  record: UserProfile;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // --- URLs & Config from your new environment file ---
  private readonly OAUTH_TOKEN_URL = environment.apiUrl.replace('/api/', '/') + 'oauth/token';
  private readonly PROFILE_URL = environment.apiUrl + 'profile';
  private readonly LOGOUT_URL = environment.apiUrl + 'profile/logout';
  // Removed Forgot Password and Reset Password URLs

  private readonly CLIENT_ID = 3;
  private readonly CLIENT_SECRET = 'Lr6A5v8zgFj580Yfmz4wMORiQMjaE3IUmvB7mi9l';
  private readonly GRANT_TYPE = 'password';

  private readonly SESSION_KEY = 'HGDFWEBNDBFUSHDFDNSFBDHSGFDBNSFB';

  private http = inject(HttpClient);

  currentUser = signal<UserProfile | null>(null);
  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    // Check for a saved session on app start
    const session = this.getSession();
    if (session && session.access_token) {
      if (session.profile) {
        // If profile is already in session, just use it
        this.currentUser.set(session.profile);
      } else {
        // If no profile, fetch it
        this.getProfile().subscribe({
          error: () => this.clearSession() // Token is invalid, log out
        });
      }
    }
  }

  /**
   * Attempts to log in the user (from old file)
   */
  public login(username: string, password: string): Observable<AuthResponse> {
    const path = this.OAUTH_TOKEN_URL;
    const data = {
      username: username,
      password: password,
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      grant_type: this.GRANT_TYPE
    };

    return this.http.post<AuthResponse>(path, data)
      .pipe(
        tap((resp) => this.setSession(resp)), // Save the full auth response
        catchError((err) => {
          console.error("Login failed", err);
          return throwError(() => new Error('Invalid username or password'));
        })
      );
  }

  // --- Removed forgotPassword, resetPassword, and verifyToken methods ---

  /**
   * Saves the session to native localStorage.
   * Replaces angular-2-local-storage.
   */
  public setSession(data: AuthResponse): void {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Could not save session to localStorage', e);
    }
  }

  /**
   * Gets the full session from native localStorage.
   */
  public getSession(): AuthResponse | null {
    try {
      const sess = localStorage.getItem(this.SESSION_KEY);
      return sess ? JSON.parse(sess) as AuthResponse : null;
    } catch (e) {
      console.error('Could not parse session from localStorage', e);
      return null;
    }
  }

  /**
   * Gets just the token from the session (from old file).
   */
  public getToken(): string | null {
    const sess = this.getSession();
    return (sess && sess.access_token) || null;
  }

  /**
   * Logs the user out (from old file).
   */
  public logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get(this.LOGOUT_URL, { headers }).pipe(
      tap(() => {
        this.clearSession();
        // Clear other session storage items
        sessionStorage.removeItem('last_login_logged');
        sessionStorage.removeItem('avaya_connect');
      }),
      catchError((err) => {
        // Still clear session even if logout API fails
        this.clearSession();
        sessionStorage.removeItem('last_login_logged');
        sessionStorage.removeItem('avaya_connect');
        return of(null); // Return a successful observable
      })
    );
  }

  /**
   * Clears session from storage and updates signal (from old file).
   */
  public clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.currentUser.set(null);
  }

  /**
   * Fetches the logged-in user's profile (from old file).
   */
  public getProfile(): Observable<ProfileResponse> {
    const path = this.PROFILE_URL;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<ProfileResponse>(path, { headers }).pipe(
      tap((resp: ProfileResponse) => {
        const sess = this.getSession();
        if (sess) {
          sess.profile = resp.record; // Add profile to session
          this.setSession(sess); // Re-save session
          this.currentUser.set(resp.record); // Update signal
        }
      })
    );
  }

  public getUserType(): string {
    // Added null-check for safety
    let profile = this.getSession()?.profile;
    if (profile && profile.access_type) {
      return profile.access_type;
    }
    return '';
  }

  /**
   * @description Check if current user have access to a permission
   * @param permissions Array of permissions or String single permission
   * @param strict boolean if true user must have access to all permissions
   * @param owner_id also check the ownership
   */
  public canAccess(permissions: string | string[], strict: boolean = false, owner_id: number | null = null): boolean {
    const profile = this.currentUser();
    if (!profile || !profile.permissions) {
      return false;
    }

    const acl = profile.permissions;

    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }

    let hasPermission = false;
    if (strict) {
      // FIX: Added (item: string) to fix 'any' type error
      hasPermission = permissions.every((item: string) => acl.includes(item));
    } else {
      // FIX: Added (item: string) to fix 'any' type error
      hasPermission = permissions.some((item: string) => acl.includes(item));
    }

    if (owner_id === null) {
      return hasPermission;
    } else {
      // FIX: Changed comparison to use profile.id (number)
      return hasPermission && profile.id === owner_id;
    }
  }

  public getUserIP() {
    return this.http.get('http://api.ipify.org?format=json');
  }

  /**
   * Fixed to use lastValueFrom instead of deprecated toPromise()
   */
  public async getProfileAsync(): Promise<UserProfile | undefined> {
    const path = this.PROFILE_URL;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    try {
      // FIX: Use lastValueFrom for modern RxJS
      let resp: ProfileResponse = await lastValueFrom(this.http.get<ProfileResponse>(path, { headers }));
      if (resp && resp.record) {
        return resp.record;
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching profile async', error);
      return undefined;
    }
  }
}