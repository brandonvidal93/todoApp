import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage!: Storage;

  async init() {
    this._storage = await this.storage.create();
  };

  constructor(private storage: Storage) {
    this.init();
  }

  set(key: string, value: any) {
    this._storage.set(key, value);
  }

  get<T>(key: string): Promise<T> {
    return this._storage.get(key);
  }
}
