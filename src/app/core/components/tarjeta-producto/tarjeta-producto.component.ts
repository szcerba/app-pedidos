import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Producto} from "../../interfaces/productos";

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.scss'
})
export class TarjetaProductoComponent {
  @Input({required: true}) producto!: Producto

}
