import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private usersService : UsersService,private router : Router) { }

  loginid : any;
  email : any;
  password : any;
  conpassword : any;

  ngOnInit(): void {
  }

  savePassword(){

    if(this.loginid == undefined || this.email == undefined || this.password == undefined || this.conpassword == undefined)
    {
      window.alert("Please enter all fields !");
      return;
    }
    if(this.password !== this.conpassword)
    {
      window.alert("Password and confirm password should be same !");
      return;
    }

    let new_user = {
      "loginId" : this.loginid,
      "email" : this.email,
      "password" : this.password
    }

    console.log(new_user);
    // return
    this.usersService.saveNewPassword(new_user).subscribe((data : any) => {

      if(data.ack === "0")
      {
        window.alert("Password updated successfully !");
        this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      }
      else
      {
        window.alert("LoginId or Email Incorrect !");
      }
      
    });
  }

  onKey(event : any)
  { 
    if(event.target.id == "loginid")
      this.loginid = event.target.value;

    if(event.target.id == "password")
      this.password = event.target.value;

      if(event.target.id == "email")
      this.email = event.target.value;

    if(event.target.id == "conpassword")
      this.conpassword = event.target.value;
  }
}
