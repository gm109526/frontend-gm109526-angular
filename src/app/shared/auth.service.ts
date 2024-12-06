import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { userId: 'admin', password: 'admin', role: 'admin' },
    { userId: 'user1', password: 'password1', role: 'user' },
    { userId: 'user2', password: 'password2', role: 'user' }
  ];


  loggedIn = false;
  admin = false;

  logIn() {
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
    this.admin = false
  }
  
  isLogged() {
    const isUserLoggedIn = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    );
    return isUserLoggedIn;
  }

  verifyLogin(userId, password) {
    const user = this.users.find(u => u.userId === userId && u.password === password);
    if (user) {
      if (user.role === 'admin') {
        this.admin = true;
      } else {
        this.admin = false;
      }
      return true;
    } else {
      this.admin = false;
      return false;
    }
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.admin)
      }
    );
    return isUserAdmin;
  }

  constructor() { }
}
