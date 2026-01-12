import { TaskService } from './../../tasks/task.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSegment, IonSegmentButton, IonLabel, IonItem, IonCheckbox } from '@ionic/angular/standalone';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { combineLatest, map } from 'rxjs';
import { FilterService } from 'src/app/core/filter.service';
import { CategoryService } from 'src/app/categories/category.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [CommonModule, IonSegment, IonSegmentButton, IonLabel, IonItem, IonCheckbox, ScrollingModule]
})
export class TasksPage implements OnInit {

  constructor( private taskService: TaskService, private filterService: FilterService, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  tasks$ = combineLatest([
    this.taskService.getAll(),
    this.filterService.filter$
  ]).pipe(
    map(([tasks, filter]) => {
      if (!filter) return tasks;
      return tasks.filter(t => t.categoryId === filter);
    })
  );

  categories$ = this.categoryService.getAll();

  onFilter(ev:any) {
    const val = ev.detail.value || null;
    this.filterService.setCategory(val);
  }

  toggle(id: string) {
    this.taskService.toggle(id);
  }
}
