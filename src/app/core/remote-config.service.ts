import { Injectable } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {

  constructor(private remoteConfig: RemoteConfig) {};

  load() {
    return from(fetchAndActivate(this.remoteConfig));
  };
  
  get enableCategories() {
    return getValue(this.remoteConfig, 'enable_categories').asBoolean();
  };
}
