import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TabsComponent} from "./core/components/tabs/tabs.component";
import {HeaderComponent} from "./core/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TabsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pedir-comida';
}
