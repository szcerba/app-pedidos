import {Component, inject, OnInit} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {

  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
  }
}
