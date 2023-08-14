import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isLoggedIn = new BehaviorSubject(false);
  logoutUser() {
    this.isLoggedIn.next(false);
    
  }
  loginUser() {
    this.isLoggedIn.next(true);
  }
}