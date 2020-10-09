import { Component, OnInit } from '@angular/core';
import { ILoginform } from '@Service/interfaces/login.interfaces';
import { IregisterUser } from '@Service/interfaces/user.interfaces';

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
    ro_id: 2,
    is_valid: 1,
  };
  constructor() {}

  ngOnInit(): void {}
}
