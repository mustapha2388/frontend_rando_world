import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NominatimResponse} from '../shared/models/nominatim-response.model';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {

  @Input() choiceResult:string = "";

  @Input()
  results: NominatimResponse[];

  @Input()
  results2: NominatimResponse[];


  @Output()
  locationSelected = new EventEmitter();
  @Output()
  locationSelected2 = new EventEmitter();

  constructor () {
  }

  selectResult (result: NominatimResponse) {
    this.locationSelected.emit(result);
  }

  selectResult2 (result: NominatimResponse) {
    this.locationSelected2.emit(result);
  }

}
