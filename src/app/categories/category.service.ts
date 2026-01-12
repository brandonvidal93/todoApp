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
    this.load();
  };

  async load() {
    const data = await this.storage.get<Category[]>(STORAGE_KEYS.CATEGORIES);
    this.categories$.next(data || []);
  };

  getAll() {
    return this.categories$.asObservable();
  };

  async add(name: string, description: string, color?: string) {
    const newCat: Category = {
      id: crypto.randomUUID(),
      name,
      description,
      color
    };

    const updated = [...this.categories$.value, newCat];
    this.categories$.next(updated);
    await this.storage.set(STORAGE_KEYS.CATEGORIES, updated);
  };

  async remove(id: string) {
    const updated = this.categories$.value.filter(cat => cat.id !== id);
    this.categories$.next(updated);
    await this.storage.set(STORAGE_KEYS.CATEGORIES, updated);
  };
}
