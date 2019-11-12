import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(public modalController: ModalController,public crudService: CrudService) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
