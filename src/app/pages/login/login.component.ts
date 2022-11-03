import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { User } from 'src/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private userSerive : UsersService) { }

  loginid : any;
  password : any;
  loginUser : User = new User;

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

  public newUserClick() {
    this.router.navigate(['/signup']);
  }

  public loginButtonClick(){

    console.log("loginid :",this.loginid);
    console.log("password :",this.password);

    if(this.loginid == "" || this.password == "")
    {
      window.alert("Please enter all values");
    }

    // let user : any = {
    //   "loginId" : this.loginid,
    //   "password" : this.password,
    // }

    this.loginUser.loginId = this.loginid;
    this.loginUser.password = this.password;
    this.loginUser.email = "";
    this.loginUser.contact="";
    this.loginUser.firstName="";
    this.loginUser.lastName="";
    this.userSerive.loginUser(this.loginUser).subscribe((data : any) => {

      console.log(data);
      if(data.ack === "0")
      {
        window.alert("Login successfull !");

      localStorage.setItem("loginid",this.loginid);
      localStorage.setItem("type","user");

      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
      }
      else
      {
        window.alert("LoginId or Password Incorrect !");
      }
    })

  }

  public forgetPasswordClick(){
    this.router.navigate(['/forgetpassword']).then(() => {
      window.location.reload();
    });
  }

  onKey(event : any)
  { 
    if(event.target.id == "loginId")
      this.loginid = event.target.value;

    if(event.target.id == "password")
      this.password = event.target.value;
  }
}
