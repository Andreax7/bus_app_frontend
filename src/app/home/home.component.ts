import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public showticketinfo = false;
 public showsubinfo = false;
 
  constructor() { }

  ngOnInit(): void {
  }

  show1(): void {
    if (this.showticketinfo) this.showticketinfo = false;
    else this.showticketinfo = true;
  }
  show2(): void {
    if (this.showsubinfo) this.showsubinfo = false;
    else this.showsubinfo = true;
  }
}
