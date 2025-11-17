import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
  name: 'Francisco',
  gender: 'male',
  age: 35,
  address: 'Ottawa, Canadá'
}

const client2 = {
  name: 'Maria',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, CardComponent, I18nSelectPipe,
    I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe,
    TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {
  //=============================i18n select===================================
  client = signal(client1)

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2)
      return;
    }
    this.client.set(client1);
  }

  //=============================i18n plural===================================

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando'
  })

  clients = signal([
    'Maria',
    'Pablo',
    'Carlos',
    'Tatiana',
    'Sabrina',
    'Jorge',
  ])

  deleteClient() {
    this.clients.update(prev => prev.slice(1))
  }

  //================================KeyValue pipe==============================
  profile = signal({
    name: 'Fernando',
    age: 36,
    address: 'Costa Rica'
  })

  //=================================Async pipe================================
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject('Se produjo un error')
      resolve('Data en la promesa')
    }, 3500);
  })

  myObservableTimer = interval(2000).pipe(
    tap((value) => console.log('tap: ' + value))
  )
}
