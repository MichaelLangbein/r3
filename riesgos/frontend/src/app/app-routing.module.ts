import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteAboutComponent } from './route-components/route-about/route-about.component';
import { RouteAccessibilityComponent } from './route-components/route-accessibility/route-accessibility.component';
import { RouteLegalNoticeComponent } from './route-components/route-legal-notice/route-legal-notice.component';
import { RouteMapComponent } from './route-components/route-map/route-map.component';
import { RoutePrivacyComponent } from './route-components/route-privacy/route-privacy.component';
import { RouteTermsOfUseComponent } from './route-components/route-terms-of-use/route-terms-of-use.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full', },
  {
    path: 'map', component: RouteMapComponent,
    data: {
      title: 'Map'
    }
  },
  {
    path: 'about',
    component: RouteAboutComponent,
    data: {
      title: 'About',
    }
  },
  {
    path: 'privacy',
    component: RoutePrivacyComponent,
    data: {
      title: 'Privacy',
    }
  },
  {
    path: 'legal-notice',
    component: RouteLegalNoticeComponent,
    data: {
      title: 'Legal Notice',
    }
  },
  {
    path: 'accessibility',
    component: RouteAccessibilityComponent,
    data: {
      title: 'Accessibility',
    }
  },
  {
    path: 'terms-of-use',
    component: RouteTermsOfUseComponent,
    data: {
      title: 'Terms of Use',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
