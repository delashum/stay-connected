import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { DbService } from '../services/db.service';
import { AddPersonComponent } from './add-person/add-person.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PersonFormComponent } from './person-form/person-form.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    HomeRoutingModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
    NativeScriptUIDataFormModule,
  ],
  declarations: [HomeComponent, AddPersonComponent, PersonFormComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DbService],
  entryComponents: [AddPersonComponent],
})
export class HomeModule {}
