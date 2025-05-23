import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _registeredUsersKey = 'registeredUsers';
  user:User|null = null;

  router:Router=inject(Router);
  register(email: string, password: string): void {
    const registeredUsers = JSON.parse(localStorage.getItem(this._registeredUsersKey) || '[]');
    const userExists = registeredUsers.some((user: { email: string }) => user.email === email);

    if (userExists) {
      alert('User already exists');
    } else {
      registeredUsers.push({ email, password });
      localStorage.setItem(this._registeredUsersKey, JSON.stringify(registeredUsers));
      this.router.navigate(['/login']);

    }
  }

  login(email: string, password: string): void {
    const registeredUsers = JSON.parse(localStorage.getItem(this._registeredUsersKey) || '[]');
    const user = registeredUsers.find((user: { email: string; password: string }) => user.email === email && user.password === password);

    if (user) {
      this.router.navigate(['/covid-info']);
      this.user = user;
    } else {
      alert('Invalid email or password');
    }
  }

  logout(): void {
    this.user = null;
    this.router.navigate(['/login']);
  }


}
