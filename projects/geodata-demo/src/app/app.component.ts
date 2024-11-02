import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeodataVisualizationService } from 'geodata-visualization';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FormsModule],
  providers: [GeodataVisualizationService, MatSnackBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef;
  latitude: number = 0;
  longitude: number = 0;
  title: string = '';
  isFormOpen: boolean = false;
  polygonCoordinates: string = '';
  polygonColor: string = 'blue';
  isPolygonFormOpen: boolean = false;
  rasterUrl: string = ''; // Input for raster URL
  colorFilter: string = '';
  isRasterFormOpen: boolean = false;
  newColor: string = 'red';
  constructor(
    private geodataService: GeodataVisualizationService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.geodataService.initializeMap('map', {
      center: [39.8282, -98.5795],
      zoom: 5,
    });
  }
  switchToPhysicalMap() {
    this.geodataService.switchToPhysicalMap();
  }
  openFormPopup() {
    this.isFormOpen = true;
  }

  closeFormPopup() {
    this.isFormOpen = false;
  }
  addPoint() {
    if (this.latitude && this.longitude && this.title) {
      this.geodataService.addPoint(this.latitude, this.longitude, {
        title: this.title,
      });
      this.snackBar.open('Point added successfully!', 'Close', {
        duration: 3000,
      });
      this.closeFormPopup();
      this.latitude = 0;
      this.longitude = 0;
      this.title = '';
    } else {
      this.snackBar.open('Error: Please fill all fields correctly.', 'Close', {
        duration: 3000,
      });
    }
  }
  openPolygonPopup() {
    this.isPolygonFormOpen = true;
  }

  closePolygonPopup() {
    this.isPolygonFormOpen = false;
  }
  addPolygon() {
    if (this.polygonCoordinates && this.polygonColor) {
      try {
        const coordinates = this.polygonCoordinates
          .split('\n')
          .map((line) => line.split(',').map(Number) as [number, number]);

        if (coordinates.some((coord) => isNaN(coord[0]) || isNaN(coord[1]))) {
          throw new Error('Invalid coordinates');
        }

        this.geodataService.addPolygon(coordinates, {
          color: this.polygonColor,
        });
        this.snackBar.open('Polygon added successfully!', 'Close', {
          duration: 3000,
        });
        this.closePolygonPopup();
        this.polygonCoordinates = '';
        this.polygonColor = 'blue';
      } catch (error) {
        this.snackBar.open(
          'Error: Invalid polygon coordinates format.',
          'Close',
          { duration: 3000 }
        );
      }
    } else {
      this.snackBar.open('Error: Please fill all fields correctly.', 'Close', {
        duration: 3000,
      });
    }
  }
  openChangeColorPopup() {
    this.isPolygonFormOpen = true;
  }
  changePolygonColor() {
    const lastPolygon = this.geodataService.getLastPolygon();

    if (lastPolygon) {
      this.geodataService.setLayerColor(lastPolygon, this.newColor);
      this.snackBar.open(
        `Polygon color changed to ${this.newColor}!`,
        'Close',
        { duration: 3000 }
      );
    } else {
      this.snackBar.open('Error: No polygon found to change color.', 'Close', {
        duration: 3000,
      });
    }
  }

  addRasterLayer() {
    if (this.rasterUrl) {
      this.geodataService.addRaster(this.rasterUrl, this.colorFilter);
      this.snackBar.open('Raster layer added successfully', 'Close', {
        duration: 2000,
      });
    } else {
      this.snackBar.open('Please enter a valid raster URL', 'Close', {
        duration: 2000,
      });
    }
  }
 changeLayerOpacity(type: string, opacity: number) {
    const layer = this.geodataService.activeLayers[type];
    if (layer) {
      this.geodataService.setLayerOpacity(layer, opacity);
    }
  }
}
