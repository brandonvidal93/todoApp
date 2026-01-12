import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { listOutline, folderOutline } from "ionicons/icons";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink]
})
export class TabsPage implements OnInit {

  constructor() { 
    addIcons({
      listOutline,
      folderOutline,
    })
  }

  ngOnInit() {
  }

}
