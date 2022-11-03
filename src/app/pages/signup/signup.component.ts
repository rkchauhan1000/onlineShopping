import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { User } from 'src/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(private router : Router , private userService : UsersService) { }

  firstname : any = "";
  lastname : any = "";
  email : any = "";
  password : any;
  confirmpassword : any;
  contact : any;
  loginid : any;
  user: User = new User;

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

  public existingUserClick(){
    this.router.navigate(['/login']);
  }

  public validateEmail(email : any) : Boolean {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase())
  }

  public validatePhoneNumber(number : any) : Boolean 
  {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(number);
  }

  public signupClick(){
    console.log("First : ", this.firstname);
    console.log("last : ",this.lastname);
    console.log("contact : ",this.contact);
    console.log("email : ",this.email);
    console.log("loginid : ",this.loginid);
    console.log("password : ",this.password);
    console.log("conpassword : ",this.confirmpassword);

    if(this.firstname == "" || this.lastname == "" || this.contact == "" || this.email == "" || this.loginid == "" || this.contact == "" || this.password == "" || this.confirmpassword == "")
    {
      window.alert("Please enter all the values !!");
      return;
    }

    if(this.password !== this.confirmpassword)
    {
      window.alert("Password and confirm password must be same !!");
      return;
    }

    if(!this.validateEmail(this.email))
    {
      window.alert("Enter a valid email address !!");
      return;
    }

    if(!this.validatePhoneNumber(this.contact))
    {
      window.alert("Enter a valid contact number !!");
      return;
    }

    this.user.firstName = this.firstname;
    this.user.lastName = this.lastname;
    this.user.contact = this.contact;
    this.user.email = this.email;
    this.user.loginId = this.loginid;
    this.user.password = this.password;

    this.userService.registerUser(this.user).subscribe((data : any) => {

      if(data.ack === "0")
      {
        console.log(data);
      window.alert("Account created successfully !")

      localStorage.setItem("loginid",this.loginid);
      localStorage.setItem("type","user");
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
      }
      else
      {
        window.alert("Error while creating account !")
      }
    })
  }

  onKey(event : any)
  { 
    if(event.target.id == "firstname")
      this.firstname = event.target.value;

    if(event.target.id == "lastname")
      this.lastname = event.target.value;

    if(event.target.id == "email")
      this.email = event.target.value;
    
    if(event.target.id == "contact")
      this.contact = event.target.value;
    
    if(event.target.id == "loginid")
      this.loginid = event.target.value; 
      
    if(event.target.id == "password")
      this.password = event.target.value;

    if(event.target.id == "confirmpassword")
      this.confirmpassword = event.target.value;    
  }
}
