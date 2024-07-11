import {Component, inject, OnInit} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss'
})
export class ArticuloComponent implements OnInit {

  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.titulo.set("Articulo");
  }

}
