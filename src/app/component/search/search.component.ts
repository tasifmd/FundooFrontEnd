import { Component, OnInit } from '@angular/core';
import { DashBoardComponent } from '../dash-board/dash-board.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private dashBoard : DashBoardComponent) { }
  notes : any;
  ngOnInit() {
    this.dashBoard.currentMessage.subscribe(
      (response: any)=>{
        this.notes = response;
        console.log(this.notes);
      }
    );
  }

}
