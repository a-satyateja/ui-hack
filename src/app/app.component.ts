import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SocketService } from './app-services';
import { connect } from 'mqtt';
const client  =  connect('wss://iot.eclipse.org:443/ws');
const {SpeechSynthesisUtterance}: IWindow = <IWindow>window;
const {speechSynthesis}: IWindow = <IWindow>window;
export interface IWindow extends Window {
  SpeechSynthesisUtterance: any;
  speechSynthesis: any;
}
 const synth = speechSynthesis;
const msg = new SpeechSynthesisUtterance();
console.log('recognition', speechSynthesis);
// const msg = recognition.speechSynthesis;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  public connection: Subscription;
  public data: any;
  public user: any;
  public isStandby: boolean = true;
  public isActive: boolean = false;
  public isPointA: boolean = true;
  public isPointB: boolean = false;
  // public inputForm;
  public inputTxt;
  public voiceSelect;
  public pitch;
  public pitchValue;
  public rate;
  public rateValue;
  public voices = [];
    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

  constructor(private socketService: SocketService){ }

  sendMessage(flag) {
    console.log('hit');
    client.publish('techolution_in',`${flag}`);
  };

  ngOnInit() {
    client.on('connect', function () {
      client.subscribe('techolution_in');
    });
    client.on('message', function (topic, message) {
      console.log('recivedMessage', message.toString());
      client.end();
    });

    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };
    // this.populateVoiceList();
    const text = 'Welcome to Techolution Mr Baba We were expecting you.!';
    // this.speak(text);
    this.myParams = {
      particles: {
        number: {
          value: 200,
        },
        color: {
          value: '#ff0000'
        },
        shape: {
          type: 'triangle',
        },
      }
    };
    this.enableSocket();
  }
  enableSocket() {
    this.socketService.getMessages().subscribe((res) => {
      console.log('res', res);
    });
  }
  speak(text) {
    console.log('msg', text);
    msg.text = text;
    // Set the attributes.
     msg.lang = 'en-US';
    // msg.voice = 'native'; msg.voice = 'Google US English'; //  'Google UK English Female'
     msg.voice = msg.default;
     msg.volume = 1;
     msg.rate = 1;
     msg.pitch = 1;
     speechSynthesis.speak(msg);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  };
}


// default color: '#ff0000'