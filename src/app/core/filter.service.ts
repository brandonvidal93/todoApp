import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private categoryFilter$ = new BehaviorSubject<string | null>(null);

  setCategory(id: string | null) {
    this.categoryFilter$.next(id);
  };

  get filter$() {
    return this.categoryFilter$.asObservable();
  };
}
