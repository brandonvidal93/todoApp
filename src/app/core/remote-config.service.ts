import { Injectable } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {

  private enableCategories$ = new BehaviorSubject<boolean>(false);

  constructor(private remoteConfig: RemoteConfig) {};

  load() {
    return from(fetchAndActivate(this.remoteConfig)).subscribe(() => {
      const enabled = getValue(this.remoteConfig, 'enable_categories').asBoolean();
      this.enableCategories$.next(enabled);
    });
  };
  
  categoriesEnabled() {
    return this.enableCategories$.asObservable();
  }
}
