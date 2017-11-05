import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:8080';
  private socket;

  sendMessage(message) {
    this.socket.emit('sendMessage', message);
  }

  getMessages() {
    console.log('in');
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('reciveData', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}