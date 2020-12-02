import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-landpage',
  templateUrl: './back-landpage.component.html',
  styleUrls: ['./back-landpage.component.scss']
})
export class BackLandpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  log(msg){
    console.log(msg);
  }

}
