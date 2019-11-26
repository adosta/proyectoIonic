import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  Events:any;

  constructor(public modalController: ModalController,public crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Events().subscribe(data => {
      this.Events = data.map(e => {
        return {
          ID: e.payload.doc.id,
          Fecha: e.payload.doc.data()['fecha'],
          Jugador: e.payload.doc.data()['jugador'],
          Tipo: e.payload.doc.data()['tipo'],
        };
      })
      //console.log(this.Events);
    })
  }

  deleteEvent(id){
    console.log(id);
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
