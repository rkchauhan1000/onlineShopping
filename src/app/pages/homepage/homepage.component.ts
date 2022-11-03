import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/Product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private productService : ProductsService,private router : Router) {
    this.loadData();
   }

  loadData(){
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    })
  }
  search : String = "";

  products: Product[] = [];

  id : any = "";
  type : any = "";

  ngOnInit(): void {
    this.id = localStorage.getItem("loginid");
    this.type = localStorage.getItem("type");

    if(this.id)
    {
      if(this.type == "admin")
      {
        this.router.navigate(['/adminpage']);
      }
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  onKey(event : any)
  { 
    if(event.target.id == "search")
      this.search = event.target.value;
  }

  searchClick(event : any){

    event.preventDefault();

    console.log("Search clicked !!")
    if(this.search != "")
    { 
      console.log(this.search.toLowerCase())
      this.productService.searchProduct(this.search).subscribe((data : any) => {

        this.products.splice(0);

        if(data.ack !== "")
        {
          this.products.push(data);
        }
      })
    }
    else
    {
      this.loadData();
    }

    console.log(this.products);
  }

  placeOrder(item : Product){

    let order = {
      "loginId" : this.id,
      "product" : item
    }

    console.log(order)

    this.productService.placeOrder(this.id,item).subscribe((data : any) => {
      console.log(data);

      if(data.ack === "0")
      {
        window.alert("Order placed successfully !");
      }
      else
      {
        window.alert("Error while placing order !");
      }
    })
  }
}
