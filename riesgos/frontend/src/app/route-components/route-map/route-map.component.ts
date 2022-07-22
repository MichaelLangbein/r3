import { Component, HostBinding, OnInit } from '@angular/core';

import { LayersService } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { IMapControls } from '@dlr-eoc/map-ol';
import { EocLitemap, BlueMarbleTile } from '@dlr-eoc/base-layers-raster';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService, Graph, Process, Product } from 'src/app/services/backend.service';
import { VectorLayer } from '@dlr-eoc/services-layers';


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
  public actions$ = new BehaviorSubject<Action[]>([]);
  public products$ = new BehaviorSubject<Product[]>([]);
  
  constructor(
    public layerSvc: LayersService,
    public mapStateSvc: MapStateService,
    private backendSvc: BackendService,
  ) {
    this.controls = {};
  }

  ngOnInit() {
    this.addBaselayers();
    this.backendSvc.getGraph().subscribe((graph: Graph) => {
        console.log("got new graph: ", graph);

        const actions: Action[] = [];

        for (const process of graph.processes) {
          const action: Action = {
            process: process,
            userParas: []
          };
          
          for (const productId of process.requires) {
            const product = graph.products.find(p => p.id === productId);
            if (product && product.options) {
              action.userParas.push(product); 
            }
          }

          actions.push(action);
        }

        
        const displayableProducts: Product[] = [];
        for (const product of graph.products) {
          if (product && product.display) {
            displayableProducts.push(product);
          }
        }

        this.actions$.next(actions);
        this.products$.next(displayableProducts);
    });


    this.backendSvc.getInfo().subscribe(info => {
      this.mapStateSvc.setExtent(info.aoi);
    });

    this.products$.subscribe((products: Product[]) => {
      console.log("got new products: ", products)
      this.layerSvc.removeLayers();
      for (const product of products) {
        console.log(product)
        if (product.display && product.display === 'geojson') {
          this.layerSvc.addLayer(new VectorLayer({
            id: product.id,
            name: product.id,
            type: 'geojson',
            data: product.data
          }), 'Layers');
        }
      }
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



export interface Action {
  process: Process,
  userParas: Product[]
}