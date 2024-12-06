import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);
  const authType = route.data['authType'];

  if (authType === 'admin') {
    return authService.isAdmin()
    .then(authentifie => {
      if(authentifie) {
        console.log("Vous êtes admin, navigation autorisée !");
        return true;
      } else {
        console.log("Vous n'êtes pas admin ! Navigation refusée !")
        router.navigate(["/home"]);
        return false;
      }
    });
  } else if (authType === 'loggedIn') {
    return authService.isLogged()
    .then(loggedIn => {
      if(loggedIn) {
        console.log("Vous êtes connecté, navigation autorisée !");
        return true;
      } else {
        console.log("Vous n'êtes pas connecté ! Navigation refusée !")
        router.navigate(["/home"]);
        return false;
      }
    });
  } else {
    return true;
  }
}

