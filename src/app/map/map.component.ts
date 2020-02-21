import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../app.constants';
import { MapPoint } from '../shared/models/map-point.model';
import { NominatimResponse } from '../shared/models/nominatim-response.model';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: L.Map;
  mapPoint: MapPoint;
  options: L.MapOptions;
  lastLayer: any;
  routingControl: L.Routing.Control;

  results: NominatimResponse[];

  constructor() {
  }

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();




  }

  initializeMap(map: L.Map) {
    this.map = map;
    this.createMarker();
    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng(this.mapPoint.latitude, this.mapPoint.longitude),
        L.latLng(57.6792, 11.949)
      ],
      routeWhileDragging: true,
    }).addTo(this.map);



  }

  getAddress(result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  refreshSearchList(results: NominatimResponse[]) {
    this.results = results;
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 12,
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OSM' })
      ]
    }
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: 'Hello',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    };
  }

  private onMapClick(e: L.LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.routingControl.setWaypoints(
      [
        L.latLng(latitude, longitude),
        L.latLng(57.6792, 11.949)
      ]
    )
    
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = L.latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = L.marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

}
