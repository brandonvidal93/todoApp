import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';
import { CategoryService } from 'src/app/categories/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/categories/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon]
})
export class CategoriesPage implements OnInit {
  categories$!: Observable<Category[]>;
  newCategory = '';

  constructor(private categoryService: CategoryService) {
    addIcons({
      trashOutline,
      createOutline
    })
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

  add() {
    if (!this.newCategory.trim()) return;
    this.categoryService.add(this.newCategory, '');
    this.newCategory = '';
  };

  delete(id: string) {
    this.categoryService.remove(id);
  };
}
