import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId = '';
  password = '';
  errorMessage = '';

  constructor (private authService: AuthService, private router: Router, private dialog: MatDialogModule) {}

  onSubmit() {
    if (this.userId === '' || this.password === '') return;

    if (this.authService.verifyLogin(this.userId, this.password)) {
      this.errorMessage = '';
      console.log("Connexion...");
      this.authService.logIn();
      this.router.navigate(['/home']);
    } else {
      this.authService.logout();
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    }

  }
}
