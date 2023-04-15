import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { TodoListComponent } from './modules/todo-list/todo-list.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children:[{
    path: '',
    component: TodoListComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
