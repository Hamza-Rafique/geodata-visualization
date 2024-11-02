import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeodataVisualizationService } from 'geodata-visualization';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [GeodataVisualizationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef;
  constructor(private geodataService: GeodataVisualizationService) {}

  ngAfterViewInit(): void {
    console.log('Map element:', this.mapElement);
    // console.log('Map element native element:', this.mapElement.nativeElement);
    // if (this.mapElement) {
      this.geodataService.initializeMap('map', { center: [0, 0], zoom: 2 });
      
    // }
    console.log('Map initialized');
    // this.geodataService.initializeMap(this.mapElement.nativeElement, { center: [0, 0], zoom: 2 });
    // this.geodataService.addLayer(this.geodataService.getMap('map'), L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
  }
  title = 'geodata-demo';
}
