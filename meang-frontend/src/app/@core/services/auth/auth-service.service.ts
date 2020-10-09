import { Injectable } from '@angular/core';
import { ISession } from '@Service/interfaces/session.interfaces';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  LoggedRol() {
    // tslint:disable-next-line: no-inferrable-types
    let role: boolean = false;
    const validate = JSON.parse(localStorage.getItem('session')) as ISession;
    if (validate) {
      if (validate.id !== this.roid) {
        role = true;
      } else {
        role = false;
      }
    } else {
      return role;
    }
  }
}
