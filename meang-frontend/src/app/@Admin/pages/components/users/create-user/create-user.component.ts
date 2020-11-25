import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '@Service/interfaces/product.interface';
import {
  IregisterUser,
  IResponseDataUser,
  IResponseUsers,
} from '@Service/interfaces/user.interfaces';
import { UserService } from '@Service/services/user/user.service';
import { basicAlert } from '@Shared/toast';
import { Types_Alert } from '@Shared/values.config';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  formClien: Partial<IregisterUser> = {
    use_name: '',
    use_lastname: '',
    use_age: 0,
    use_email: '',
    use_phone: '',
    use_status: 1,
    ro_id: environment.idCliente,
    is_valid: 1,
  };
  idUser: number;
  label: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(async (res: Params) => {
      if (res.id != null || res.id !== undefined) {
        this.idUser = res.id;
        this.label = 'Actualizar Usuario';
        this.getuser(res.id);
      } else {
        this.label = 'Crear Usuario';
      }
    });
  }

  ngOnInit(): void {}

  getuser(id) {
    const filter = {
      filter: {
        use_id: id,
        is_valid: 1,
        ro_id: environment.idCliente,
      },
      limit: 10,
    };
    this.userService.getUser(filter).subscribe(
      (data: IResponseDataUser) => {
        this.poblateTableUser(data.body);
      },
      (err) => {}
    );
  }
  poblateTableUser(data: IResponseUsers) {
    data.rows.forEach((element) => {
      this.formClien = {
        use_id: element.use_id,
        use_name: element.use_name,
        use_lastname: element.use_lastname,
        use_email: element.use_email,
        use_phone: element.use_phone,
        use_status: element.use_status,
      };
    });
  }
  onOptionsSelected(data: any) {
    const values = data === '1' ? true : false;
    this.formClien.use_status = values;
  }

  saveUser() {
    if (this.idUser) {
      this.userService.updateUser(this.idUser, this.formClien).subscribe(
        (data: IResponseDataUser) => {
          if (!data.error) {
            basicAlert(
              'USUARIOS',
              'Actualizado Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            this.router.navigate(['/admin/users/list']);
          } else {
            basicAlert(
              'USUARIOS',
              'Error Al Crear',
              'Aceptar',
              Types_Alert.ERROR
            );
          }
        },
        (err) => {
          basicAlert(
            'USUARIOS',
            'Error Al Actualizado',
            'Aceptar',
            Types_Alert.ERROR
          );
          console.log(err);
        }
      );
    } else {
      this.userService.register(this.formClien).subscribe(
        (data: IResponseDataUser) => {
          if (!data.error) {
            basicAlert(
              'USUARIOS',
              'Creado Correctamente',
              'Aceptar',
              Types_Alert.SUCCESS
            );
            this.router.navigate(['/admin/users/list']);
          } else {
            basicAlert(
              'USUARIOS',
              'Error Al Crear',
              'Aceptar',
              Types_Alert.ERROR
            );
          }
        },
        (err) => {
          basicAlert(
            'USUARIOS',
            'Error Al Crear',
            'Aceptar',
            Types_Alert.ERROR
          );
          console.log(err);
        }
      );
    }
  }
}
