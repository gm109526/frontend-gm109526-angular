import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './shared/auth.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AssignmentsComponent } from "./assignments/assignments.component";

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatDividerModule,
    MatIconModule, AssignmentsComponent, CommonModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  loggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  isLogged() {
    if(this.authService.loggedIn) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

  login() {
    if(!this.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
  }
}