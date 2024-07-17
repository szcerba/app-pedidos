import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  standalone: true,
  imports: [],
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.scss'
})
export class ContadorCantidadComponent implements OnInit {

  ngOnInit(): void {
    this.numero.set(this.cantidadInicial)
  }

  numero = signal(1)
  @Output() cantidadCambiada = new EventEmitter<number>()
  @Input() cantidadInicial = 1;

  actualizarNumero(diferencia: number) {
    this.numero.set(Math.max(this.numero() + diferencia, 1))
    this.cantidadCambiada.emit(this.numero())
  }


}
