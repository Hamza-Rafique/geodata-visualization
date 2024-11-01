import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  private layers: L.Layer[] = [];

  addLayer(map: L.Map,layer: L.Layer): void {
    this.layers.push(layer);
    layer.addTo(map); // Assuming map is a reference to your Leaflet map
  }

  toggleLayerVisibility(map: L.Map,layer: L.Layer, visible: boolean): void {
    visible ? layer.addTo(map) : map.removeLayer(layer);
  }

  setLayerOpacity(layer: L.Layer, opacity: number): void {
    if (layer instanceof L.TileLayer) {
      layer.setOpacity(opacity);
    }
  }
}
