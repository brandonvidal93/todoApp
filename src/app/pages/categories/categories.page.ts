import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline, addOutline } from 'ionicons/icons';
import { CategoryService } from 'src/app/categories/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/categories/category.model';
import { TaskService } from 'src/app/tasks/task.service';
import { Task } from "src/app/tasks/task.model";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon]
})
export class CategoriesPage implements OnInit {
  categories$!: Observable<Category[]>;
  tasks: any[] = [];
  newCategory = '';
  newDescription = '';

  constructor(
    private categoryService: CategoryService,
    private alertCtrl: AlertController,
    private taskService: TaskService
  ) {
    addIcons({
      trashOutline,
      createOutline,
      addOutline
    })
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  hasTasks(categoryId: string): boolean {
    return this.tasks.some(task => task.categoryId === categoryId);
  }

  add() {
    if (!this.newCategory.trim()) return;
    this.categoryService.add(this.newCategory, this.newDescription);
    this.newCategory = '';
    this.newDescription = '';
  };

  delete(id: string) {
    this.categoryService.remove(id);
  };

  async update(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Editar categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: category.name,
          placeholder: 'Nombre'
        },
        {
          name: 'description',
          type: 'text',
          value: category.description,
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            this.categoryService.update(
              category.id,
              data.name,
              data.description
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(category: Category) {
    if (this.hasTasks(category.id)) {
      const alert = await this.alertCtrl.create({
        header: 'No se puede eliminar',
        message: `La categoría ${category.name} tiene tareas asignadas. Elimina o mueve esas tareas antes de borrar la categoría.`,
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    
    const alert = await this.alertCtrl.create({
      header: 'Eliminar categoría',
      message: `¿Seguro que deseas eliminar la categoría ${category.name}? Las tareas asociadas quedarán sin categoría.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.delete(category.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
