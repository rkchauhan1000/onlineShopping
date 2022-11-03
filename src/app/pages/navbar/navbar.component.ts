import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private productService : ProductsService,private router : Router) { }

  userLogged : any;
  id : any;
  type : any;
  ngOnInit(): void {
    this.id = localStorage.getItem("loginid");
    this.type = localStorage.getItem("type");

    if(this.id)
    {
      this.userLogged = true;
    }
    else
    {
      this.userLogged = false;
    }
  }
  
  clickedLogout(){
    this.userLogged = false
    localStorage.removeItem("loginid");
    localStorage.removeItem("type");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  bagClicked(){
    this.router.navigate(["/usercart"]).then(() => {
      window.location.reload();
    });
  }
}
