import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '@Service/services/auth/auth-service.service';
import { LoginService } from '@Service/services/login/login.service';
import { basicAlert } from 'src/app/@Shared/toast';
import { Types_Alert } from 'src/app/@Shared/values.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authSessio: AuthServiceService,
    private login: LoginService
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.login.logout().subscribe((data) => {
      if (!data.error) {
        localStorage.removeItem('session');
        basicAlert(
          'Inicio Sesion',
          'Se Ha Finalizado Correctamente',
          'Aceptar',
          Types_Alert.SUCCESS
        );
      }
    });
  }
}
