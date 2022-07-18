import { Component, HostBinding, OnInit } from '@angular/core';

import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';
import { EocLitemap, BlueMarbleTile } from '@dlr-eoc/base-layers-raster';
import { BackendService } from 'src/app/services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit {
  @HostBinding('class') class = 'content-container';


  public controls: IMapControls;
  public nav = {
    rightWidth: 14,
    minWidth: 12,
    maxWidth: 40,
    unit: 'rem'
  };
  public actions$!: Observable<any>;
  
  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    private backendSvc: BackendService,
  ) {
    this.controls = {};
  }

  ngOnInit() {
    this.addBaselayers();
    this.actions$ = this.backendSvc.getActions();
    this.backendSvc.getInfo().subscribe(info => {
      this.mapStateSvc.setExtent(info.aoi);
    });
  }

  addBaselayers() {
    const layers = [
      new EocLitemap({
        visible: true
      }),
      new BlueMarbleTile({
        visible: false
      })
    ];

    layers.map(l => this.layerSvc.addLayer(l, 'Baselayers'));
  }

}