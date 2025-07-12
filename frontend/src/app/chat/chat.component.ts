import { Component } from '@angular/core';
import {OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  styleUrl: './chat.component.css',
  template: `
  <input [(ngModel)]="message" />
  <button (click)="sendMessage()">Send</button>

  <ul>
    <li *ngFor="let msg of messages">{{ msg }}</li>
  </ul>
`,
})
export class ChatComponent {
  message: string = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.listen<string>('chat message').subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socketService.emit('chat message', this.message);
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
