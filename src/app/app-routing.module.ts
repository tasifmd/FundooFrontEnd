import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { AuthGuardService } from './service/auth-guard.service';
const routes: Routes = [
  {
    path:'',
    component:RegisterComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'forgotpassword',
    component : ForgotpasswordComponent
  },
  {
    path: 'user/resetpassword/:token',
    component : ResetpasswordComponent
  },
  {
    canActivate:[AuthGuardService],
    path: 'dashboard',
    component : DashBoardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
