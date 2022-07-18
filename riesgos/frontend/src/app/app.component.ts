import { Component } from '@angular/core';

import './components/icons/ukis';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { appVersion } from '../environments/version';
import { Meta } from '@angular/platform-browser'

interface IUi {
  floating: boolean;
  flipped: boolean;
  alert: null | IAlert;
  progress: null | IProgress;
  subs: Subscription[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  shortTitle = '';
  version = appVersion;

  ui: IUi = {
    floating: false,
    flipped: false,
    alert: null,
    progress: null,
    subs: []
  };

  routes: Routes;

  constructor(
    private alertService: AlertService,
    private progressService: ProgressService,
    public router: Router,
    private meta: Meta
  ) {
    this.routes = this.router.config.filter(r => r.data);
    this.init();
  }


  init() {
    const meta = this.getHtmlMeta(['title', 'version', 'description', 'short-title']);
    if (meta['title']) {
      this.title = meta['title'];
    }
    if (meta['short-title']) {
      this.shortTitle = meta['short-title'];
    }
    if (this.version) {
      this.meta.updateTag(
        { name: 'version', content: `v${this.version}` },
        'name=version'
      );
    }
    this.ui.subs = this.sub2AlertAndProgress();
  }

  /**
   *  returns an object with the keys from the input array
   */
  getHtmlMeta(names: string[]) {
    const ref = document.getElementsByTagName('meta');
    const obj: { [name: string]: string } = {};
    for (let i = 0, len = ref.length; i < len; i++) {
      const meta = ref[i];
      const name = meta.getAttribute('name');
      if (name && names.includes(name)) {
        const cv = meta.getAttribute('content') || meta.getAttribute('value');
        if (cv) {
          obj[name] = cv;
        }
      }
    }
    return obj;
  }

  sub2AlertAndProgress() {
    const subs: Subscription[] = [
      this.alertService.alert$.subscribe((alert) => {
        this.ui.alert = alert;
      }),
      this.progressService.progress$.subscribe((progress) => {
        this.ui.progress = progress;
      })
    ];
    return subs;
  }

  ngOnDestroy() {
    this.ui.subs.map(s => s.unsubscribe());
  }
}
