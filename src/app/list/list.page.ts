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
  cont2: number = 0;

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

  async presentAlert(name,equipo,badge) {
    console.log(equipo);
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
        },
        {
          type:'radio',
          label:'3P',
          value:'3p'
        },
        {
          type:'radio',
          label:'P1',
          value:'p1'
        },
        {
          type:'radio',
          label:'P2',
          value:'p2'
        },
        {
          type:'radio',
          label:'T',
          value:'t'
        },
        {
          type:'radio',
          label:'U2',
          value:'u2'
        },
        {
          type:'radio',
          label:'D',
          value:'d'
        },
        {
          type:'radio',
          label:'F',
          value:'f'
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
            Event['equipo'] = equipo;
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
        this.cont2=0;
        this.playerEvents.forEach(element => {
          if(element.tipo == "p1" || element.tipo == "p2")
          {
            let h = document.getElementById(element.jugador).firstChild.nextSibling;
            this.cont++;
            h.textContent = this.cont.toString();
          }
          if(element.tipo == "t" || element.tipo == "u2"){
            console.log(element.jugador)
            let h1 = document.getElementById(element.jugador).firstChild.nextSibling;
            let h2 = document.getElementById(element.jugador).lastChild;
            this.cont++;
            h1.textContent = this.cont.toString();
            this.cont2++;
            h2.textContent = this.cont2.toString();
          }
        });
      })
    })
  }

}
