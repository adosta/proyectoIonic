import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  d = new Date;

  constructor(private firestore: AngularFirestore) { }

  /*create_NewStudent(record) {
    return this.firestore.collection('Students').add(record);
  }
  read_Players() {
    return this.firestore.collection('jugadores').snapshotChanges();
  }
  update_Student(recordID,record){
    this.firestore.doc('Students/' + recordID).update(record);
  }
  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }*/

  read_Divisions() {
    return this.firestore.collection('divisiones').snapshotChanges();
  }
  
  read_Teams(division) {
    return this.firestore.collection('equipos', ref => ref.where('division', '==', division)).snapshotChanges();
  }

  /*read_Players(equipo) {
    return this.firestore.collection('jugadores', ref => 
    ref.where('equipos', 'array-contains', equipo)).snapshotChanges();
  }*/

  read_Players(equipo) {
    return this.firestore.collection('equipos', ref => 
    ref.where('nombre', '==', equipo)).snapshotChanges();
  };

  create_NewEvent(record) {
    return this.firestore.collection('faltasPuntos').add(record);
  }

  read_Events(){
    return this.firestore.collection('faltasPuntos', ref => 
    ref.where('fecha', '==', this.d.getDate() +"-"+ 
    (this.d.getMonth() + 1) +"-"+ this.d.getFullYear())).snapshotChanges();
  }
  read_PlayerEvents(nombre){
    return this.firestore.collection('faltasPuntos', ref => 
    ref.where('fecha', '==', this.d.getDate() +"-"+ 
    (this.d.getMonth() + 1) +"-"+ this.d.getFullYear()).where('jugador','==',nombre)).snapshotChanges();
  }

  /*read_PlayerEvents(nombre){
    return this.firestore.collection('faltasPuntos', ref => 
    ref.where('fecha', '==', this.d.getDate() +"-"+ 
    (this.d.getMonth() + 1) +"-"+ this.d.getFullYear()).where('jugador','==',['Arturo', 'Alfredo'])).snapshotChanges();
  }*/
}