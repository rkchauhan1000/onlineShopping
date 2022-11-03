import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/Product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private productService : ProductsService,private router :  Router) {
   }

  loadData(){
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    })
  }
  search : String = "";
  newProduct : Product = new Product;

  selectedProduct : Product = new Product;
  productToBeAdded : Product = new Product;

  modalProductName : String = "";
  modalProductDescription : String = "";
  modalProductFeatures : String = "";
  modalProductPrice : String = "";
  modalProductStatus : String = "";
  modalProductQuantity : any;
  products: Product[] = [];
  ngOnInit(): void {
    this.loadData();

    let id = localStorage.getItem("loginid");
    let type = localStorage.getItem("type");

    if(id)
    {
      if(type == "user")
      {
        this.router.navigate(['/']);
      }
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  editButtonClicked(product : Product){
    this.selectedProduct = product;
  }
  onKey(event : any)
  { 
    if(event.target.id == "search")
      this.search = event.target.value;

    if(event.target.id == "modal-product-name")
      this.modalProductName = event.target.value;
    
    if(event.target.id == "modal-product-description")
      this.modalProductDescription = event.target.value;

    if(event.target.id == "modal-product-features")
      this.modalProductFeatures = event.target.value;

    if(event.target.id == "modal-product-price")
      this.modalProductPrice = event.target.value;

    if(event.target.id == "modal-product-quantity")
      this.modalProductQuantity = event.target.value;

    if(event.target.id == "Out of Stock")
      this.modalProductStatus = "Out of Stock";

    if(event.target.id == "Hurry up to purchase")
    this.modalProductStatus = "Hurry up to purchase";
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

  deleteProduct(event : any,productName : String,index : any) {
    this.productService.deleteProduct(productName).subscribe((data : any) => {
      console.log(data);
      
      if(data.ack === "0")
      { 
        window.alert("Product deleted successfully !")
        this.router.navigate(['/adminpage']).then(() => {
          window.location.reload();
        });
      }
      else
      {
        window.alert("Error in deleting this product !")
      }
    })
  }

  dropdownOptionSelected(event : any){

    if(this.selectedProduct.productStatus !== event.target.id)
    {
      this.newProduct.productName = this.selectedProduct.productName;
      this.newProduct.productDescription = this.selectedProduct.productDescription;
      this.newProduct.price = this.selectedProduct.price;
      this.newProduct.productStatus = event.target.id;
      this.newProduct.features = this.selectedProduct.features;
      this.newProduct.quantity = this.selectedProduct.quantity;
      this.productService.changeProductStatus(this.selectedProduct.productName,this.newProduct).subscribe((data : any) => {
        console.log(data);

        if(data.ack === "0")
        {
          window.alert("Product status updated successfully !")

        this.router.navigate(['/adminpage']).then(() => {
          window.location.reload();
        });
        }
        else
        {
          window.alert("Product status not updated !")
        }
      })
    }
    
  }

  addProduct(){

    if(this.productToBeAdded.productName == "" || this.productToBeAdded.productDescription == "" || this.productToBeAdded.features == "" || this.productToBeAdded.price == "" || this.productToBeAdded.productStatus == "")
    {
      window.alert("Please enter all the values");
      return;
    }

    this.productToBeAdded.productName = this.modalProductName;
    this.productToBeAdded.productDescription = this.modalProductDescription;
    this.productToBeAdded.features = this.modalProductFeatures;
    this.productToBeAdded.price = this.modalProductPrice;
    this.productToBeAdded.productStatus = this.modalProductStatus;
    this.productToBeAdded.quantity = this.modalProductQuantity;

    this.productService.createProduct(this.productToBeAdded).subscribe((data : any) => {
      console.log(data);

      if(data.ack === "0")
      {
        window.alert("Product Added successfully !")

      this.router.navigate(['/adminpage']).then(() => {
        window.location.reload();
      });
      }
      else
      {
        window.alert("Product not Added !")
      }

    })
  }
}
