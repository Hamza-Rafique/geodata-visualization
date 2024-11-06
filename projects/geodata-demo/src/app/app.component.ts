import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeodataVisualizationService } from 'geodata-visualization';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayerControlPanelComponent } from './LayerControlPanel/layer-control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FormsModule, CommonModule],
  providers: [GeodataVisualizationService, MatSnackBar,BrowserAnimationsModule, LayerControlPanelComponent ],
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
  rasterUrl: string = ''; 
  colorFilter: string = '';
  isRasterFormOpen: boolean = false;
  newColor: string = 'red';
  isOpen = false;
  activeLayers: { [key: string]: boolean } = {}; 
  layerOpacity: { [key: string]: number } = {};
  tifUrl: string | undefined; 
  loading: boolean = false;
  constructor(
    private geodataService: GeodataVisualizationService,
    private snackBar: MatSnackBar
  ) {}
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    document.body.classList.toggle('sidebar-closed', !this.isOpen);
  }
  ngAfterViewInit(): void {
    this.geodataService.initializeMap('map', {
      center: [39.8282, -98.5795],
      zoom: 5,
    });
  }
  openRasterFormPopup() {
    this.isRasterFormOpen = true;
  }
  
  closeRasterPopup() {
    this.isRasterFormOpen = false;
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
      this.geodataService.addPoint(
        this.latitude,
        this.longitude,
        { title: this.title },
        () => {               
          console.log(`Marker for ${this.title} clicked at (${this.latitude}, ${this.longitude})`);
          // this.snackBar.open(`Marker for ${this.title} clicked!`, 'Close', { duration: 3000 });
        }
      );
  
      this.closeFormPopup();
      this.latitude = 0;
      this.longitude = 0;
      this.title = '';
    } else {
      console.log('Error: Please fill all fields correctly.');
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
        // this.snackBar.open('Polygon added successfully!', 'Close', {
        //   duration: 3000,
        // });
        this.closePolygonPopup();
        this.polygonCoordinates = '';
        this.polygonColor = 'blue';
      } catch (error) {
        // this.snackBar.open(
        //   'Error: Invalid polygon coordinates format.',
        //   'Close',
        //   { duration: 3000 }
        // );
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
      // this.snackBar.open('Raster layer added successfully', 'Close', {
      //   duration: 2000,
      // });
      console.log('Raster layer added successfully');
    } else {
      console.log('Please enter a valid raster URL');
      // this.snackBar.open('Please enter a valid raster URL', 'Close', {
      //   duration: 2000,
      // });
    }
    this.closeRasterPopup();
  }
  async fetchAndDisplayTIF(url: string) {
    this.loading = true; 
    const tifBlob = await this.geodataService.fetchTIF(url);
    if (tifBlob) {
  
      this.tifUrl = URL.createObjectURL(tifBlob);
    } else {
      console.error('Failed to retrieve TIF file');
    }
    this.loading = false; 
  }
 changeLayerOpacity(type: string, opacity: number) {
    // const layer = this.geodataService.activeLayers[type];
    // if (layer) {
    //   this.geodataService.setLayerOpacity(layer, opacity);
    // }
  }
}
