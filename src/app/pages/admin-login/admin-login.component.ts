import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { Router } from '@angular/router';
import { User } from 'src/User';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService : UsersService,private router : Router) { }

  loginid : any;
  password : any;
  user : User = new User;
  ngOnInit(): void {
    let id = localStorage.getItem("loginid");
    let type = localStorage.getItem("type");

    if(id)
    {
      if(type == "user")
      {
        this.router.navigate(['/']);
      }
      else if(type == "admin")
      {
        this.router.navigate(['/adminpage']);
      }
    }
  }

  onKey(event : any)
  { 
    if(event.target.id == "loginId")
      this.loginid = event.target.value;

    if(event.target.id == "password")
      this.password = event.target.value;
  }

  loginButtonClicked(){

    // let user = {
    //   "loginId" : this.loginid,
    //   "password" : this.password
    // }

    this.user.loginId = this.loginid;
    this.user.password = this.password;
    console.log(this.user);

    this.userService.adminLogin(this.user).subscribe((data : any) => {

      if(data.ack === "0")
      {
        window.alert("Login successfully !");

        localStorage.setItem("loginid",this.loginid);
        localStorage.setItem("type","admin");

        this.router.navigate(['/adminpage']).then(() => {
        window.location.reload();
      });
      }
      else
      {
        window.alert("LoginId or Password Incorrect !");
      }
    })
  }
}
