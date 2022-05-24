import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'labeling-toolbar',
  templateUrl: './labeling-toolbar.component.html',
  styleUrls: ['./labeling-toolbar.component.css']
})
export class LabelingToolbarComponent implements OnInit {

  @Input('title') title = "";

  constructor() { }

  ngOnInit(): void {
  }

}
