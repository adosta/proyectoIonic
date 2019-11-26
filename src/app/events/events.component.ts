import { Component, OnInit} from '@angular/core';
import { NavParams, AlertController } from '@ionic/angular';

import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

    playerName:string;
    
    /*months = new Array("January", "February", "March",
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December");  */

    d = new Date;

  constructor(private navParams: NavParams,private crudService:CrudService,private alert:AlertController) { }

  ngOnInit() {
    this.playerName = this.navParams.data.player;
  }

  /*createEvent(name,type){
    let evento= {};
    evento['fecha'] = Date.now(),
    evento['jugador'] = name;
    evento['tipo'] = type;
    this.crudService.create_NewEvent(evento);
  }*/

  /*async presentAlert(name,type) {
    const alert = await this.alert.create({
      header: 'Confirmacion',
      message: name + ", " + type,
      buttons: [
        {
          text:'OK',
          handler: (alert) => {
            let Event= {};
            Event['fecha'] = ((this.d.getMonth() + 1) +"-"+ this.d.getDate() +"-"+ this.d.getFullYear()),
            Event['jugador'] = name;
            Event['tipo'] = type;
            this.crudService.create_NewEvent(Event);
          }
        },
        {
          text:"Cancelar"
        }
      ]
    });
    await alert.present();
  }*/

  /*async presentAlert(name) {
    const alert = await this.alert.create({
      header: 'Faltas y puntos',
      message: name,
      buttons: [
        {
          text:'OK',
          handler: (alert) => {
            let Event= {};
            Event['fecha'] = ((this.d.getMonth() + 1) +"-"+ this.d.getDate() +"-"+ this.d.getFullYear()),
            Event['jugador'] = name;
            Event['tipo'] = type;
            this.crudService.create_NewEvent(Event);
          }
        },
        {
          text:"Cancelar"
        }
      ]
    });
    await alert.present();
  }*/

}
