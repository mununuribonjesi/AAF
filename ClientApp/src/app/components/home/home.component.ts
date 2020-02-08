import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends LoginComponent implements OnInit {

  ngOnInit() {

   
    this._loginService.getUserName()
    .subscribe(
      data => this.username = data.authData.email,
            
      error => {
        if(error instanceof HttpErrorResponse){ 
          console.log(error.status)
        if(error.status === 401){  
          this._router.navigate(['../login']);
        }
      }
    }
  )

  console.log(this.username);


  
}

logout(){

    localStorage.removeItem('token');
    this._router.navigate(['../login']);   
    
  }
}
