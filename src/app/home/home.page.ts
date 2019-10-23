import { Component, OnInit } from '@angular/core';
 
import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  players: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Players().subscribe(data => {
 
      this.players = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Nombre: e.payload.doc.data()['nombre'],
          PrimerApellido: e.payload.doc.data()['primerApellido'],
          SegundoApellido: e.payload.doc.data()['segundoApellido'],
        };
      })
      console.log(this.players);
 
    });
  }

}