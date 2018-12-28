import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { IPerson, Person } from '~/app/models/person.model';
import { DbService } from '~/app/services/db.service';

@Component({
  selector: 'ns-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  moduleId: module.id,
})
export class PersonFormComponent implements OnInit {
  person: Person;
  editable_person: Partial<IPerson>;

  constructor(private _db: DbService, private _route: ActivatedRoute, private _router: RouterExtensions) {}

  ngOnInit() {
    this._route.params.subscribe(e => {
      this.person = this._db.get_person(e.person_id);
      this.editable_person = {
        name: this.person.name,
        frequency: this.person.frequency,
      };
    });
  }

  save() {
    this._db.update_person(this.person.id, this.editable_person);
    this._router.back();
  }

  delete() {
    this._db.delete_person(this.person.id);
    this._router.back();
  }
}
