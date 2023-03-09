import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'register',component:RegistrationComponent},
  {path:'edit/:id',component:RegistrationComponent},
  {path:'list',component:UserListComponent},
  {path:'detail/:id',component:UserdetailComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
