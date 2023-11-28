import { Component } from '@angular/core';

@Component({
  selector: 'app-day-and-time',
  templateUrl: './day-and-time.component.html',
  styleUrls: ['./day-and-time.component.scss']
})
export class DayAndTimeComponent {
  day = new Date().getDate()
  month = new Date().getMonth()
  year = new Date().getFullYear()
  hour = new Date().getHours()
  minutes = new Date().getMinutes()
  seconds = new Date().getSeconds()

  constructor() {
    setInterval(() => {
      this.hour = new Date().getHours()
      this.minutes = new Date().getMinutes()
      this.seconds = new Date().getSeconds()
    }, 1000)
  }
}
