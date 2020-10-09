import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '@Service/services/auth/auth-service.service';
import { LoginService } from '@Service/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authSessio: AuthServiceService,
    private login: LoginService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.login.logout().subscribe((data) => {
      if (data.error) {
        localStorage.removeItem('session');
      }
    });
  }
}
