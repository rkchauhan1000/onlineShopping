import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AdminLoginComponent,
    HomepageComponent,
    NavbarComponent,
    AdminpageComponent,
    ForgetPasswordComponent,
    UserCartComponent,
    OrdersPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
