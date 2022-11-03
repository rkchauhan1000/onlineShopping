import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url : String;

  constructor(private http : HttpClient) {
    this.url = 'http://localhost:8080';
   }
  
  public registerUser(userData : User) : any{
    console.log("SERVICE ----------------->");
    return this.http.post(this.url + '/register',userData);
  }

  public loginUser(userData : User) : any {

    return this.http.post(this.url + '/userLogin',userData);
  }

  public adminLogin(user : User) : any {
    return this.http.post(this.url + '/adminLogin',user)
  }

  public saveNewPassword(user : any) : any{
    return this.http.put(this.url + '/forgetPassword',user)
  }
}
