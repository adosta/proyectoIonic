import { Component, OnInit } from '@angular/core';
 
import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  Divisions:any;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Divisions().subscribe(data => {
      this.Divisions = data.map(e => {
        return {
          Nombre: e.payload.doc.data()['nombre'],
        };
      })
    });
  }

}