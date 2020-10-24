import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ICategory,
  IResponseDataCategorys,
} from '@Service/interfaces/category.interface';
import { AuthServiceService } from '@Service/services/auth/auth-service.service';
import { CategoryService } from '@Service/services/category/category.service';
import { LoginService } from '@Service/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  category: Partial<ICategory>[];
  constructor(
    public authSessio: AuthServiceService,
    private login: LoginService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.category = [];
  }

  async ngOnInit() {
    this.authSessio.LoggedRol();
    await this.getCategory();
  }

  logout() {
    this.login.logout().subscribe((data) => {
      if (data.error) {
        localStorage.removeItem('session');
      }
    });
  }

  getCategory() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 16,
    };
    this.categoryService.getCategoryByFilter(filter).subscribe(
      (data: IResponseDataCategorys) => {
        data.body.rows.forEach((element) => {
          this.category.push({
            ca_name: element.ca_name,
            ca_id: element.ca_id,
          });
        });
      },
      (err) => {}
    );
  }
  redirect(id: any) {
    this.router.navigate(['/product/all/', id]);
  }
}
