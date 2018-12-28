import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { IPerson, Person } from '../models/person.model';
import { DbService } from '../services/db.service';
import { AddPersonComponent } from './add-person/add-person.component';

@Component({
  selector: 'Home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ONE_DAY = 1000 * 60 * 60 * 24;
  public people: Person[];
  constructor(
    private _db: DbService,
    private _modal: ModalDialogService,
    private _vc: ViewContainerRef,
    private _router: RouterExtensions,
    private _page: Page
  ) {}

  ngOnInit() {
    this._fetch_people();
    this._page.on('navigatingTo', () => {
      this._fetch_people();
    });
  }

  delete_person(id: any) {
    this._db.delete_person(id);
    this._fetch_people();
  }

  add_person() {
    this._modal.showModal(AddPersonComponent, { viewContainerRef: this._vc }).then(added => {
      if (added) {
        this._fetch_people();
      }
    });
  }

  person_countdown(person: IPerson) {
    if (!person.last_contacted) {
      return 'never';
    } else {
      return Math.floor((new Date().getTime() - person.last_contacted) / this.ONE_DAY);
    }
  }

  is_overdue(person: IPerson) {
    if (!person.last_contacted) {
      return false;
    }
    const num_days = (new Date().getTime() - person.last_contacted) / this.ONE_DAY;
    return num_days > person.frequency;
  }

  is_never(person: IPerson) {
    return !person.last_contacted;
  }

  contact_person(person: IPerson) {
    this._db.add_log(person.id, true);
  }

  goto_person(person: IPerson) {
    this._router.navigate(['home', person.id]);
  }

  private _fetch_people() {
    this.people = this._db.get_people();
  }
}
