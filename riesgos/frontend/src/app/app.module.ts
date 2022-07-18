import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import {  AppRoutingModule } from './app-routing.module';

import { MapOlModule } from '@dlr-eoc/map-ol';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { RouteLegalNoticeComponent } from './route-components/route-legal-notice/route-legal-notice.component';
import { RoutePrivacyComponent } from './route-components/route-privacy/route-privacy.component';
import { RouteTermsOfUseComponent } from './route-components/route-terms-of-use/route-terms-of-use.component';
import { RouteAccessibilityComponent } from './route-components/route-accessibility/route-accessibility.component';
import { RouteAboutComponent } from './route-components/route-about/route-about.component';
import { VerticalNavResizeComponent } from './components/vertical-nav-resize/vertical-nav-resize.component';
import { NavResizeDirectiveDirective } from './directives/nav-resize-directive/nav-resize-directive.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import all used icons
import { coreCollectionIcons, essentialCollectionIcons, ClarityIcons } from '@cds/core/icon';
// loading an icon from the "core set" now must be done manually
ClarityIcons.addIcons(...coreCollectionIcons);
ClarityIcons.addIcons(...essentialCollectionIcons);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalAlertComponent,
    GlobalProgressComponent,
    RouteMapComponent,
    RouteLegalNoticeComponent,
    RoutePrivacyComponent,
    RouteTermsOfUseComponent,
    RouteAccessibilityComponent,
    RouteAboutComponent,
    VerticalNavResizeComponent,
    NavResizeDirectiveDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    MapOlModule,
    LayerControlModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    ProgressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
