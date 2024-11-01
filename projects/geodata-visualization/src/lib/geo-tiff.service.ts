import { Injectable } from '@angular/core';
import GeoTIFF from 'geotiff';

@Injectable({
  providedIn: 'root'
})
export class GeoTiffService {
  constructor() { }

  async loadTiff(url: string): Promise<any> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await (GeoTIFF as any).fromArrayBuffer(arrayBuffer);
    return tiff.getImage(); // Returns the image for further processing
  }
}