import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.css']
})
export class CardAuthComponent implements OnInit {
@Input('title') title : string = '';
@Input('subtitle') subtitle : string = '';

  constructor() { }

  ngOnInit(): void { }

}
