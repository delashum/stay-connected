export interface IPerson {
  id: string;
  name: string;
  frequency: number;
  timestamp: number;
  log: Log[];
  last_contacted: number;
}

export interface Log {
  timestamp: number;
  successful: boolean;
}

export class Person {
  id: string;
  name: string;
  frequency: number;
  timestamp: number;
  log: Log[];
  last_contacted: number;

  constructor(person: Partial<IPerson>) {
    this.id = person.id || this._generate_id();
    this.name = person.name || '';
    this.frequency = person.frequency || 1;
    this.timestamp = person.timestamp || Date.now();
    this.log = person.log || [];
    this.last_contacted = person.last_contacted || null;
  }

  public add_log(log: Log) {
    this.log.push(log);
    if (!this.last_contacted || this.last_contacted < log.timestamp) {
      this.last_contacted = log.timestamp;
    }
  }

  public update(update: Partial<IPerson>) {
    Object.keys(update).forEach(key => (this[key] = update[key]));
  }

  public get_values(): IPerson {
    return {
      id: this.id,
      name: this.name,
      frequency: this.frequency,
      timestamp: this.timestamp,
      log: this.log,
      last_contacted: this.last_contacted,
    };
  }

  private _generate_id(): string {
    return Math.random()
      .toString(32)
      .slice(2);
  }
}
