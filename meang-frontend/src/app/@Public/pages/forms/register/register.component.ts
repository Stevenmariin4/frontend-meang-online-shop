import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ILoginform } from '@Service/interfaces/login.interfaces';
import { IregisterUser } from '@Service/interfaces/user.interfaces';
import { UserService } from '@Service/services/user/user.service';
import { IResponse } from '@Service/interfaces/response.interface';
import { Router } from '@angular/router';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register: Partial<IregisterUser> = {
    use_name: '',
    use_lastname: '',
    use_age: 0,
    use_email: '',
    use_password: '',
    use_phone: '',
    ro_id: environment.idCliente,
    is_valid: 1,
  };
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this.userService.register(this.register).subscribe(
      (data: IResponse) => {
        if (!data.error) {
          basicAlert(
            'Usuario',
            'Usuario Creado Correctamente',
            'Aceptar',
            Types_Alert.SUCCESS
          );
          this.router.navigate(['/login']);
        } else {
          basicAlert(
            'Usuario',
            'Usuario Error Creando Usuario',
            'Aceptar',
            Types_Alert.SUCCESS
          );
        }
      },
      (err) => {
        console.log(err);
        basicAlert(
          'Usuario',
          'Usuario Error Creando Usuario',
          'Aceptar',
          Types_Alert.SUCCESS
        );
      }
    );
  }
}
