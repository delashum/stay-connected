import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { HomeComponent } from './home.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [{ path: '', component: HomeComponent }, { path: ':person_id', component: PersonFormComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class HomeRoutingModule {}
