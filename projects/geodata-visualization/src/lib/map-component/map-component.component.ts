import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LayerService } from '../layer.service';

@Component({
  selector: 'lib-map',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  constructor(private layerService: LayerService) {}

  ngOnInit(): void {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Example usage of LayerService
    const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.layerService.addLayer(this.map, layer);
    this.layerService.toggleLayerVisibility(this.map, layer, true);
  }
}
