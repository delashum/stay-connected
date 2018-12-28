import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DbService } from '~/app/services/db.service';

@Component({
  selector: 'ns-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
  moduleId: module.id,
})
export class AddPersonComponent implements OnInit {
  person = {
    name: '',
    frequency: null,
  };
  constructor(private _db: DbService, private _params: ModalDialogParams) {}

  ngOnInit() {}

  cancel() {
    this._params.closeCallback(false);
  }
  save_person() {
    if (this.person.name && this.person.frequency) {
      this._db.add_person(this.person);
      this._params.closeCallback(true);
    }
  }
}
