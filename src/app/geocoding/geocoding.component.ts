import {Component, EventEmitter, Output} from '@angular/core';
import {NominatimService} from '../services/nominatim-service';
import {NominatimResponse} from '../shared/models/nominatim-response.model';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss']
})
export class GeocodingComponent {

  @Output() onSearch = new EventEmitter();
  @Output() onSearch2 = new EventEmitter();
  searchResults: NominatimResponse[];
  searchResults2: NominatimResponse[];

  constructor (private nominatimService: NominatimService) {
  }

  addressLookup (address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
        this.searchResults2 = results;
      });
    } else {
      this.searchResults = [];
      this.searchResults2 = [];
    }
    this.onSearch.emit(this.searchResults);
    this.onSearch2.emit(this.searchResults2);
  }

}
