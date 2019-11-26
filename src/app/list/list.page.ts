import { Component, OnInit } from '@angular/core';

import { CrudService } from './../services/crud.service';

import { ModalController, AlertController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

import {ActivatedRoute} from '@angular/router';

import { PopoverController } from '@ionic/angular';

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

  d = new Date;
  cont: number = 0;

  playerEvents: any;

  constructor(
    private crudService: CrudService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    public popoverController: PopoverController,
    private alert:AlertController) { }

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

  async presentModal() {
    let nombre: string
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps:{
        nombre: name
      } 
    });
    await modal.present();
  }

  async presentAlert(name,badge) {
    const alert = await this.alert.create({
      header: 'Confirmacion',
      message: name,
      inputs : [
        {
            type:'radio',
            label:'1P',
            value:'1p'
        },
        {
            type:'radio',
            label:'2P',
            value:'2p'
        }],
      buttons: [
        {
          text:'OK',
          handler: (alert) => {
            let Event= {};
            Event['fecha'] = 
            (this.d.getDate() +"-"+ 
            (this.d.getMonth() + 1) +"-"+ this.d.getFullYear()),
            Event['jugador'] = name;
            Event['tipo'] = alert;
            this.crudService.create_NewEvent(Event);
          }
        },
        {
          text:"Cancelar"
        }
      ]
    });
    await alert.present();
  }

  getPlayers(team,selector){
    this.sel = selector;
    this.crudService.read_Players(team).subscribe(data => {
      if(this.sel === 'a'){
        this.Players1 = data.map(e => {
          return {
            jugadores: e.payload.doc.data()['jugadores'],
            Entrenador: e.payload.doc.data()['entrenador']
          };
        })
        this.playersLoop(this.Players1);
        
      }
      else{
        console.log("test");
        this.Players2 = data.map(e => {
          return {
            jugadores: e.payload.doc.data()['jugadores'],
            Entrenador: e.payload.doc.data()['entrenador']
          };
        })
        this.playersLoop(this.Players2);
      }
    }); 
  }

  playersLoop(Players:any){
    Players[0].jugadores.forEach(element => {
      this.crudService.read_PlayerEvents(element).subscribe(data => {
        this.playerEvents = data.map(e=>{
          return{
            tipo: e.payload.doc.data()['tipo'],
            jugador: e.payload.doc.data()['jugador']
          }
        })
        this.cont=0;
        this.playerEvents.forEach(element => {
          let h = document.getElementById(element.jugador).lastChild;
          this.cont++;
          h.textContent = this.cont.toString();
        });
      })
    })
  }

}
