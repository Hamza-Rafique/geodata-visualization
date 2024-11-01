import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GeodataVisualizationComponent } from 'geodata-visualization';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    GeodataVisualizationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
