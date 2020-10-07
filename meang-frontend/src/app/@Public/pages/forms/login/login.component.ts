import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILoginform,
  ILoginResponse,
} from '@Service/interfaces/login.interfaces';
import { ISession } from '@Service/interfaces/session.interfaces';
import { LoginService } from '@Service/services/login/login.service';
import { basicAlert } from 'src/app/@Shared/toast';
import { Types_Alert } from 'src/app/@Shared/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: ILoginform = {
    email: '',
    password: '',
  };
  constructor(private Slogin: LoginService, private router: Router) {}

  ngOnInit(): void {}

  sigin() {
    this.Slogin.sigin(this.login).subscribe(
      (res: ILoginResponse) => {
        if (res.error) {
          return;
        }
        const date = new Date();

        date.setHours(date.getHours() + 24);
        const session: ISession = {
          expireIn: new Date(date).toISOString(),
          token: res.body.token,
          id: res.body.id,
        };
        // Guardando el token
        basicAlert(
          'Inicio Sesion',
          'Se Ha Iniciado Correctamente',
          'Aceptar',
          Types_Alert.SUCCESS
        );
        localStorage.setItem('session', JSON.stringify(session));
        this.router.navigate(['/home']);
      },
      (err: any) => {
        basicAlert(
          'Fallo Inicio Sesion',
          err.error.body || 'Ha Ocurrido un Error',
          'Aceptar',
          Types_Alert.WARNING
        );
        console.log(err);
      }
    );
  }
}
