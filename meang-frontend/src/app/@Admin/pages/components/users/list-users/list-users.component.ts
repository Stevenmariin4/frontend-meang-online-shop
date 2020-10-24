import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ITable } from '@Service/interfaces/table.interface';
import {
  IregisterUser,
  IResponseDataUser,
  IResponseUsers,
} from '@Service/interfaces/user.interfaces';
import { UserService } from '@Service/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  tableUsers: ITable;
  listUser: Partial<IregisterUser>[] = [];
  sortColumn;
  filterApplied;
  pageNumber = 0;
  pageSize = 10;

  constructor(private userService: UserService, private router: Router) {
    this.listUser = [];
    this.tableUsers = {
      table_filters: [],
      table_headers: [
        {
          propertyName: 'use_name',
          nameToShow: 'Nombre',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'use_lastname',
          nameToShow: 'Apellido',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'use_phone',
          nameToShow: 'Telefono',
          sort: 'asc',
          inputType: 'text',
        },
        {
          propertyName: 'use_email',
          nameToShow: 'Apellido',
          sort: 'asc',
          inputType: 'text',
        },
        { propertyName: 'actions', nameToShow: 'Acciones', sort: null },
      ],
      table_body: [],
      pageSize: 10,
      totalData: 30,
      numOfPages: 4,
      currentPage: 1,
    };
  }

  async ngOnInit() {
    await this.getUser();
  }

  getUser() {
    const filter = {
      filter: {
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
      this.tableUsers.table_body.push({
        id: element.use_id,
        use_name: element.use_name,
        use_lastname: element.use_lastname,
        use_email: element.use_email,
        use_phone: element.use_phone,
        inputEditable: false,
        actions: [
          { show: true, action: 'edit', icon: 'fas fa-pencil-alt' },
          { show: true, action: 'delete', icon: 'fas fa-trash' },
        ],
      });
    });
    this.tableUsers.totalData = data.count;
  }

  redirectCreate(id: any) {
    if (id !== 0) {
      this.router.navigate(['/admin/users/update/', id]);
    } else {
      this.router.navigate(['/admin/users/create']);
    }
  }
  async actionHandler(action: any) {
    switch (action.action) {
      case 'edit':
        this.router.navigate([`/admin/users/update/${action.idItem}`]);
        break;
      case 'delete':
        //this.deleteSubCategory(action.idItem);
        break;
      default:
        break;
    }
  }
  pageChanger(page: any) {
    this.pageNumber = page.page;
    this.pageSize = page.pageSize;
  }
}
