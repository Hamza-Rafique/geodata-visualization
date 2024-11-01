import { Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'lib-shape',
  standalone: true,
  imports: [],
  templateUrl: './shape.component.html',
  styleUrl: './shape.component.css'
})

export class ShapeComponent {
  @Input() shapeData: any;
  private lat: number = 0;
  private lng: number = 0;
  addShapeToMap(map: L.Map): void {
    const shape = L.polygon(this.shapeData.coordinates).addTo(map);
    shape.on('mouseover', () => L.popup().setLatLng([this.lat, this.lng]).setContent('Info about shape').openOn(map));
    shape.on('click', () => alert('Shape clicked'));
  }
}
