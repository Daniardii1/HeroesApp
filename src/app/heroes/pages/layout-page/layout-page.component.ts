import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'List', icon:'label', url: './list' },
    { label: 'Add', icon:'add', url: './new-hero' },
    { label: 'Search', icon:'search', url: './search' },
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login',]);
  }
}
