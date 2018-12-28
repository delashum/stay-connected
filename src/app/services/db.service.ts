import { Injectable } from '@angular/core';
import * as appSettings from 'tns-core-modules/application-settings';
import { IPerson, Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private _people: { [id: string]: Person };
  private _people_ids: string[];

  constructor() {
    this._people = {};
    this._people_ids = [];
    this._get();
  }

  public add_person(person: Partial<IPerson>) {
    const new_person = new Person(person);
    this._people[new_person.id] = new_person;
    this._people_ids.push(new_person.id);
    this._save();
  }

  public delete_person(id: string) {
    this._people_ids = this._people_ids.filter(_id => _id !== id);
    delete this._people[id];
    this._save();
  }

  public update_person(id: string, updates: Partial<IPerson>) {
    this._people[id].update(updates);
  }

  public add_log(person_id: string, successful: boolean) {
    this._people[person_id].add_log({ timestamp: Date.now(), successful });
    this._save();
  }

  public get_people(): Person[] {
    return this._people_ids.map(id => this._people[id]);
  }

  public get_person(id: string): Person {
    return this._people[id];
  }

  private _save() {
    this._set_value('people', this._people_ids.map(id => this._people[id].get_values()));
  }

  private _get() {
    const people = this._get_value('people') || [];
    this._people_ids = people.map(person => person.id);
    this._people = people.reduce((acc, val) => {
      return { ...acc, [val.id]: new Person(val) };
    }, {});
  }

  private _set_value(key: string, value: any) {
    appSettings.setString(key, JSON.stringify(value));
  }

  private _get_value(key: string) {
    if (appSettings.hasKey(key)) {
      return JSON.parse(appSettings.getString(key));
    } else {
      return null;
    }
  }
}
