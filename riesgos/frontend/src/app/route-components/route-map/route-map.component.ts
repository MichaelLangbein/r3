import { Component, HostBinding, OnInit } from '@angular/core';

import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';
import { EocLitemap, BlueMarbleTile } from '@dlr-eoc/base-layers-raster';
import { Observable } from 'rxjs';
import { ActionService, StatefulAction } from 'src/app/services/action.service';
import { BackendService } from 'src/app/services/backend.service';

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
  public actions$!: Observable<StatefulAction[]>;
  
  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    private actionSvc: ActionService,
    private backendSvc: BackendService,
  ) {
    this.controls = {};
  }

  ngOnInit() {
    this.addBaselayers();
    this.actionSvc.loadActions();
    this.actions$ = this.actionSvc.getActions();
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
