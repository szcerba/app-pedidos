import {Component, inject, OnInit} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss'
})
export class RubroComponent implements OnInit{

  headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.titulo.set("Rubro");
  }

}
