import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  async onLogin(): Promise<void> {
    // After successful login
    const returnUrl = localStorage.getItem('returnUrl') || '/dashboard';
    localStorage.removeItem('returnUrl');
    await this.router.navigateByUrl(returnUrl);
  }
}
