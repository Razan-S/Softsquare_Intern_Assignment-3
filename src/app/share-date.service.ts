import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDateService {

  date: Subject<string> = new Subject();
  observable: Observable<string> = this.date.asObservable();

  constructor() { }

  updateDate(date: string) {
    this.date.next(date);
  }
}
