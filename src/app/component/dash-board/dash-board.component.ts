
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login-model';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  token: string;
  email: string;
  user : LoginModel = new LoginModel();
  constructor(private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.email = localStorage.getItem('email');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

}
