import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(private authSrvice: AuthService, private router: Router) {}

  logout() {
    this.authSrvice.logout();
    this.router.navigate(['/login']);
  }
}
