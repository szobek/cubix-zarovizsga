import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router:Router=inject(Router);
  register(email: string, password: string): void {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = registeredUsers.some((user: { email: string }) => user.email === email);

    if (userExists) {
      alert('User already exists');
    } else {
      registeredUsers.push({ email, password });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      this.router.navigate(['/login']);

    }
  }


}
