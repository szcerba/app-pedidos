import {Component, inject, OnInit} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";
import {ProductosService} from "../../core/services/productos.service";
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {Producto} from "../../core/interfaces/productos";
import {CommonModule} from "@angular/common";
import {TarjetaProductoComponent} from "../../core/components/tarjeta-producto/tarjeta-producto.component";
import {CategoriasService} from "../../core/services/categorias.service";

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [
    TarjetaProductoComponent, CommonModule, RouterModule
  ],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss'
})
export class RubroComponent implements OnInit {

  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  categoriasService = inject(CategoriasService);
  ac = inject(ActivatedRoute);
  productos: Producto[] = []

  ngOnInit(): void {
    this.headerService.titulo.set("Rubro");
    this.ac.params.subscribe(params => {
      if (params['id'])
        this.categoriasService.getById(parseInt(params['id']))
          .then(categoria => {
            if (categoria) {
              this.productos = categoria.productos;
              this.headerService.titulo.set(categoria.nombre);
            }
          });
    });
  }
}
