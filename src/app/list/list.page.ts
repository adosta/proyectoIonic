import { Component, OnInit } from '@angular/core';

import { CrudService } from './../services/crud.service';

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  Players1: any;
  Players2: any;
  Teams: any;
  sel: string;

  constructor(private crudService: CrudService,public modalController: ModalController,private route: ActivatedRoute) { }

  ngOnInit() {
    let division = this.route.snapshot.paramMap.get('div');
    this.crudService.read_Teams(division).subscribe(data => {
      this.Teams = data.map(e => {
        return {
          Equipo: e.payload.doc.data()['nombre'],
        };
      })
      console.log(this.Teams);
    });
  }

  async presentModal(name) {
    let nombre: string
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps:{
        nombre: name
      } 
    });
    await modal.present();
  }

  getPlayers(team,selector){
    this.sel = selector;
    this.crudService.read_Players(team).subscribe(data => {
      if(this.sel === 'a'){
        this.Players1 = data.map(e => {
          return {
            id: e.payload.doc.id,
            Nombre: e.payload.doc.data()['nombre'],
          };
        })
      }
      else{
        console.log("test");
        this.Players2 = data.map(e => {
          return {
            id: e.payload.doc.id,
            Nombre: e.payload.doc.data()['nombre'],
          };
        })
      }
    });
  }

}
