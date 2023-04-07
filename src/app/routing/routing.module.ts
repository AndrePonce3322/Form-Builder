import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormsComponent } from '../forms-created/list-forms.component';
import { LoginComponent } from '../login/login.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { RegistroComponent } from '../registro/registro.component';
import { CreateFormComponent } from '../create-form/create-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'forms', component: MenuBarComponent,
    children: [
      { path: 'list', component: ListFormsComponent },
      { path: 'create', component: CreateFormComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
