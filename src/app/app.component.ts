import { Component, ViewChild } from '@angular/core';
import { CustomDirective } from './directive/custom.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'structural-directive';
  @ViewChild(CustomDirective, {
    static: true
  })
  template!: CustomDirective;

  messages = [
    'Message The Great',
    'Message The Majestic',
    'Message The King',
  ]

  constructor () {

  }

  ngAfterViewInit(): void {
    
  }
}
