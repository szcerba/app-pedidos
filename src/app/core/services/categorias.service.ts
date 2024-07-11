import {inject, Injectable} from '@angular/core';
import {Categoria} from "../interfaces/categorias";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() {
  }

  async getAll(): Promise<Categoria[]> {
    const res = await fetch("assets/data/database.json");
    return await res.json();
  }
}
