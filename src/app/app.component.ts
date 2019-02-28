import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AnalyticsProvider} from './services/analytics.service';
import 'hammerjs';

export const MONTHS = ['January',
    'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Today',
            url: '/today',
            icon: 'home'
        },
    ];

    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                public analyticsProvider: AnalyticsProvider) {
        MONTHS.forEach((month, index) => {
            this.appPages.push({
                title: month,
                url: `/month/${index + 1}`,
                icon: ''
            });
        });
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            }
        });
        this.analyticsProvider.startTrackerWithId('UA-64041785-1');
    }
}
