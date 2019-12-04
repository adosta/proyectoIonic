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
  cont3: number = 0;

  playerEvents: any;

  points: any;

  equipo1: any;
  equipo2: any;

  pl1 = [];
  pl2 = [];

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
        this.Players1[0].jugadores.forEach(element => {
          this.pl1.push({name:element,selected:false})
        });
        console.log(this.Players1)
        this.playersLoop(this.Players1);
        this.getScores(team);
      }
      else{
        this.Players2 = data.map(e => {
          return {
            jugadores: e.payload.doc.data()['jugadores'],
            Entrenador: e.payload.doc.data()['entrenador']
          };
        })
        this.Players2[0].jugadores.forEach(element => {
          this.pl2.push({name:element,selected:false})
        });
        this.playersLoop(this.Players2);
        this.getScores(team);
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
        this.cont3=0;
        this.playerEvents.forEach(element => {
          if(element.tipo == "1p" || element.tipo == "2p"|| element.tipo == "3p")
          {
            console.log(element.jugador);
            let h = document.getElementById(element.jugador).firstChild.firstChild.nextSibling;
            console.log(h);
            this.cont++;
            h.textContent = this.cont.toString();
          }
          if(element.tipo == "p1" || element.tipo == "p2")
          {
            let h = document.getElementById(element.jugador).firstChild.firstChild.nextSibling.nextSibling;
            this.cont2++;
            h.textContent = this.cont2.toString();
          }
          if(element.tipo == "t" || element.tipo == "u2"){
            console.log(element.jugador)
            let h1 = document.getElementById(element.jugador).firstChild.firstChild.nextSibling.nextSibling;
            let h2 = document.getElementById(element.jugador).firstChild.firstChild.nextSibling.nextSibling.nextSibling;
            this.cont2++;
            h1.textContent = this.cont2.toString();
            this.cont3++;
            h2.textContent = this.cont3.toString();
          }
        });
      })
    })
  }
  
  getScores(equipo){
    this.crudService.read_TeamScore(equipo).subscribe(data => {
      this.points = data.map(e=>{
        return{
          Tipo: e.payload.doc.data()['tipo'],
        }
      })
      this.cont=0;
      let t = document.getElementById(equipo);
      console.log(t);
      this.points.forEach(element => {
          if (element.Tipo == "1p") {
            this.cont++;
            t.textContent = this.cont.toString();
            //t.textContent = "1"
          }
          if (element.Tipo == "2p") {
            this.cont+=2;
            t.textContent = this.cont.toString();
            //t.textContent = "1"
          }
          if (element.Tipo == "3p") {
            this.cont+=3;
            t.textContent = this.cont.toString();
            //t.textContent = "1"
          }
      });
    })
  }

  getChecked(){
    console.log(this.pl1);
    console.log(this.pl2);
  }
      
}
