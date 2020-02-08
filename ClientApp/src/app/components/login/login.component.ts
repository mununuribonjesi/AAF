import { Component, OnInit } from '@angular/core';
import{LoginService} from '../../services/loginService'
import { users } from '../../dtos/user';
import {ActivatedRoute,Router} from '@angular/router';
import { user } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  username: String;
  password: string;
  objUsers:user [];


  constructor(protected _loginService: LoginService,private _activatedRoute: ActivatedRoute,protected _router: Router) { }

  ngOnInit() {

  }

  getUsers()
  {
    var user = new users();
    user.email = this.email;
    user.password = this.password;

    return user;
  }
  resetValues(value1,value2)
  {
    value1 ="";
    value2 ="";
  }


  postUser()
  {
    this._loginService.postUser(this.getUsers()).subscribe(
      data => { this.objUsers = data,
                this.email = data.user.email;
                this.username = data.user.username;
                console.log(this.username);
                localStorage.setItem('token',data.token);
                this._router.navigate(['../home']);              
      });
  }
}
