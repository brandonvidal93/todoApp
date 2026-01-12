import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../core/storage.service';
import { STORAGE_KEYS } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private storage: StorageService) {
    this.load();
  };

  async load() {
    const data = await this.storage.get<Task[]>(STORAGE_KEYS.TASKS);
    this.tasks$.next(data || []);
  };

  getAll() {
    return this.tasks$.asObservable();
  };

  async add(title: string, description: string, categoryId?: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      categoryId
    };

    const updated = [...this.tasks$.value, newTask];
    this.tasks$.next(updated);
    await this.storage.set(STORAGE_KEYS.TASKS, updated);
  };

  async toggle(id: string) {
    const updated = this.tasks$.value.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }
      return task;
    });

    this.tasks$.next(updated);
    await this.storage.set(STORAGE_KEYS.TASKS, updated);
  }

  async remove(id: string) {
    const updated = this.tasks$.value.filter(task => task.id !== id);
    this.tasks$.next(updated);
    await this.storage.set(STORAGE_KEYS.TASKS, updated);
  }
}
