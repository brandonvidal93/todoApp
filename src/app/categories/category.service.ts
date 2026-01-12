import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from './category.model';
import { StorageService } from '../core/storage.service';
import { STORAGE_KEYS } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private storage: StorageService) {
    this.init();
  };

  private async init() {
    await this.load();
  };

  async load() {
    const data = await this.storage.get<Category[]>(STORAGE_KEYS.CATEGORIES);
    this.categories$.next(data || []);
  };

  getAll() {
    return this.categories$.asObservable();
  };

  async add(name: string, description: string) {
    const newCat: Category = {
      id: crypto.randomUUID(),
      name,
      description,
    };

    const updated = [...this.categories$.value, newCat];
    this.categories$.next(updated);
    await this.storage.set(STORAGE_KEYS.CATEGORIES, updated);
  };

  async update(id: string, name: string, description: string) {
    const updated = this.categories$.value.map(cat => {
      if (cat.id === id) {
        return {
          ...cat,
          name,
          description
        }
      }
      return cat;
    });

    this.categories$.next(updated);
    await this.storage.set(STORAGE_KEYS.CATEGORIES, updated);
  };

  async remove(id: string) {
    const updated = this.categories$.value.filter(cat => cat.id !== id);
    this.categories$.next(updated);
    await this.storage.set(STORAGE_KEYS.CATEGORIES, updated);
  };
}
