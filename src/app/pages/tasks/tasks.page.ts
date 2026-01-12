import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonInput, IonItem, IonCheckbox, IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption, IonButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline, addOutline  } from 'ionicons/icons';
import { combineLatest, map } from 'rxjs';
import { FilterService } from 'src/app/core/filter.service';
import { CategoryService } from 'src/app/categories/category.service';
import { TaskService } from "src/app/tasks/task.service";
import { RemoteConfigService } from 'src/app/core/remote-config.service';
import { Task } from "src/app/tasks/task.model";

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

  categoriesEnabled$ = this.remoteConfig.categoriesEnabled();

  constructor(
    private taskService: TaskService,
    private filterService: FilterService,
    private categoryService: CategoryService,
    private remoteConfig: RemoteConfigService,
    private alertCtrl: AlertController
  ) {
    addIcons({addOutline,createOutline,trashOutline});
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

  delete(id: string) {
    this.taskService.remove(id);
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: `¿Seguro que deseas eliminar esta tarea?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.delete(task.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async edit(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Editar tarea',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: task.title,
          placeholder: 'Título'
        },
        {
          name: 'description',
          type: 'text',
          value: task.description,
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: data => {
            if (!data.title?.trim()) return false;

            this.taskService.update(
              task.id, 
              data.title,
              data.description
            );

            return true;
          }
        }
      ]
    });

    await alert.present();
  }

}
