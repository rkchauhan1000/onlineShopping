import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserCartComponent } from './pages/user-cart/user-cart.component';

const routes: Routes = [{
  path : 'login',
  component : LoginComponent,
},

{
  path : 'admin-login',
  component : AdminLoginComponent,
},

{
  path : 'signup',
  component : SignupComponent,
},

{
  path : '',
  component : HomepageComponent
},

{
  path : 'adminpage',
  component : AdminpageComponent
},

{
  path : 'forgetpassword',
  component : ForgetPasswordComponent
},

{
  path : 'usercart',
  component : UserCartComponent
},

{
  path : 'orderspage',
  component : OrdersPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
