import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonInput, IonItem, IonCheckbox, IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { combineLatest, map } from 'rxjs';
import { FilterService } from 'src/app/core/filter.service';
import { CategoryService } from 'src/app/categories/category.service';
import { TaskService } from "src/app/tasks/task.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, IonContent, IonLabel, IonInput, IonItem, IonCheckbox, ScrollingModule, IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption, IonButton, IonIcon]
})
export class TasksPage implements OnInit {
  title = '';
  description = '';
  categoryId: string | null = null;

  categories$ = this.categoryService.getAll();

  tasks$ = combineLatest([
    this.taskService.getAll(),
    this.filterService.filter$
  ]).pipe(
    map(([tasks, filter]) => {
      if (!filter) return tasks;
      return tasks.filter(t => t.categoryId === filter);
    })
  );

  constructor( private taskService: TaskService, private filterService: FilterService, private categoryService: CategoryService) {
    addIcons({
      createOutline
    })
  }

  filteredTasks: any[] = [];

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      this.filteredTasks = tasks;
    });
  }

  add() {
    if (!this.title.trim() && !this.description.trim()) return;
    this.taskService.add(this.title.trim(), this.description.trim(), this.categoryId || undefined);
    this.title = '';
    this.description = '';
    this.categoryId = null;
  }

  filter(catId: string | null) {
    const value = catId === '' ? null : catId;
    this.filterService.setCategory(value);
  }

  toggle(id: string) {
    this.taskService.toggle(id);
  }
}
