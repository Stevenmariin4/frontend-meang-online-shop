import { Injectable } from '@angular/core';
import { ISession } from '@Service/interfaces/session.interfaces';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  roid: number = environment.idCliente;
  constructor() {}

  loggedIn() {
    return !!localStorage.getItem('session');
  }

  // tslint:disable-next-line: ban-types
  public LoggedRol(): Boolean {
    // tslint:disable-next-line: no-inferrable-types
    let role: boolean = false;
    const validate = JSON.parse(localStorage.getItem('session')) as ISession;

    if (!validate) {
      role = false;
      return;
    }
    if (validate.id !== this.roid) {
      role = true;
    } else {
      role = false;
    }

    return role;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(): boolean {
    const token = JSON.parse(localStorage.getItem('session')) as ISession;

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token.token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
