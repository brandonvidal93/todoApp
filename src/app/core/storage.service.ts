import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage!: Storage;
  private ready: Promise<void>;

  constructor(private storage: Storage) {
    this.ready = this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  };

  async get<T>(key: string): Promise<T> {
    await this.ready;
    return this._storage.get(key);
  }

  async set(key: string, value: any) {
    await this.ready;
    this._storage.set(key, value);
  }

}
