import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline, addOutline } from 'ionicons/icons';
import { CategoryService } from 'src/app/categories/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/categories/category.model';

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
  newCategory = '';
  newDescription = '';

  constructor(private categoryService: CategoryService, private alertCtrl: AlertController) {
    addIcons({
      trashOutline,
      createOutline,
      addOutline
    })
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
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
}
