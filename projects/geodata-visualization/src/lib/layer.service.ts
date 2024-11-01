import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  private layers: L.Layer[] = []; // Store layers to manage them easily

  constructor() {}

  // Method to add a layer to the map
  addLayer(map: L.Map, layer: L.Layer): void {
    this.layers.push(layer);
    layer.addTo(map); // Add the layer to the specified map instance
  }

  // Method to toggle layer visibility
  toggleLayerVisibility(map: L.Map, layer: L.Layer, visible: boolean): void {
    if (visible) {
      layer.addTo(map);
    } else {
      map.removeLayer(layer);
    }
  }

  // Method to set layer opacity (only applicable to TileLayers)
  setLayerOpacity(layer: L.Layer, opacity: number): void {
    if (layer instanceof L.TileLayer) {
      layer.setOpacity(opacity);
    }
  }

  // Method to remove all layers from the map if needed
  clearAllLayers(map: L.Map): void {
    this.layers.forEach(layer => map.removeLayer(layer));
    this.layers = [];
  }
}
