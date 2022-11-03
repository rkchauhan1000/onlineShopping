import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  constructor(private productSerice : ProductsService) { }

  orders : any;

  ngOnInit(): void {

    this.productSerice.getAllOrders().subscribe((data : any) => {
      console.log(data);
      this.orders = data
    })
  }

  getDate(time : any)
  { 
    var d = new Date(time);

    return d.getDate() + "/" + d.getMonth() + "/" +d.getFullYear();
  }

}
