import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class GeodataVisualizationService {
  private layers: L.Layer[] = [];
  private map: L.Map | undefined;
  private polygons: L.Polygon[] = [];
  private defaultLayer: L.TileLayer | undefined;
  private physicalLayer: L.TileLayer | undefined;
  private isPhysicalMap: boolean = false;
  public activeLayers: { [key: string]: L.Layer } = {};

  constructor() {}

  initializeMap(elementId: string, options?: L.MapOptions): void {
    if (this.map) {
      this.map.remove(); // Remove any existing map instance
    }

    const defaultOptions: L.MapOptions = {
      center: [0, 0],
      zoom: 2,
      ...options,
    };

    this.map = L.map(elementId, defaultOptions);

    // Set default political map as the base layer
    this.defaultLayer = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution: '&copy; <a href="">Artimisa</a> contributors',
      }
    ).addTo(this.map);
  //  https://stamen-tiles-{S}.a.ssl.fastly.net
    // Prepare physical layer for toggling
    this.physicalLayer = L.tileLayer(
      'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
      {
        maxZoom: 18,
        attribution:
          'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
      }
    );
  }

  switchToPhysicalMap(): void {
    if (!this.map) return;

    // Toggle map layer
    if (this.isPhysicalMap) {
      this.map.removeLayer(this.physicalLayer!);
      this.defaultLayer!.addTo(this.map);
    } else {
      this.map.removeLayer(this.defaultLayer!);
      this.physicalLayer!.addTo(this.map);
    }
    this.isPhysicalMap = !this.isPhysicalMap;
  }

  addPoint(
    lat: number,
    lng: number,
    options?: L.MarkerOptions,
    onClick?: () => void
  ): void {
    if (!this.map) return;
    const marker = L.marker([lat, lng], options).addTo(this.map);
    if (onClick) marker.on('click', onClick);
  }

  async fetchTIF(url: string): Promise<Blob | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch TIF file');
      console.log('TIF file retrieved successfully');
      return await response.blob();
    } catch (error) {
      console.error('Error fetching TIF file:', error);
      return null;
    }
  }

  addPolygon(
    coordinates: [number, number][],
    options: { color: string },
    onClick?: () => void
  ): L.Polygon | null  {
    if (!this.map) return null;
    const polygon = L.polygon(coordinates, { color: options.color }).addTo(
      this.map
    );
    this.polygons.push(polygon);

    polygon.bindTooltip('This is a polygon', {
      permanent: false,
      direction: 'center',
    });
    if (onClick) {
      polygon.on('click', onClick);
    }
    return polygon;
  }

  getLastPolygon(): L.Polygon | null {
    return this.polygons.length
      ? this.polygons[this.polygons.length - 1]
      : null;
  }

  addRaster(url: string, colorFilter?: string): void {
    if (!this.map) return;
    const rasterLayer = L.tileLayer(url, { opacity: 0.7 }).addTo(this.map);
    const container = rasterLayer.getContainer();
    if (colorFilter && container) container.style.filter = colorFilter;
  }

  setLayerColor(layer: L.Layer, color: string): void {
    if (layer instanceof L.Polygon || layer instanceof L.CircleMarker)
      layer.setStyle({ color });
  }

  addLayer(map: L.Map, layer: L.Layer): void {
    this.layers.push(layer);
    layer.addTo(map);
  }

  toggleLayerVisibility(map: L.Map, layer: L.Layer, visible: boolean): void {
    visible ? layer.addTo(map) : map.removeLayer(layer);
  }

  activateLayer(type: string, layer: L.Layer): void {
    if (!this.activeLayers[type]) {
      this.activeLayers[type] = layer;
      layer.addTo(this.map!);
    }
  }

  deactivateLayer(type: string): void {
    const layer = this.activeLayers[type];
    if (layer) {
      layer.remove();
      delete this.activeLayers[type];
    }
  }

  setLayerOpacity(type: string, opacity: number): void {
    const layer = this.activeLayers[type];
    if (layer) {
      if (layer instanceof L.Polygon || layer instanceof L.CircleMarker) {
        layer.setStyle({ opacity });
      } else if (layer instanceof L.TileLayer) {
        layer.setOpacity(opacity);
      }
    }
  }
}
