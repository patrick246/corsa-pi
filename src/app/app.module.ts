import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './electron/electron.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {BluetoothComponent} from './bluetooth/bluetooth.component';
import {BluetoothScanComponent} from './bluetooth/bluetooth-scan/bluetooth-scan.component';
import {BluetoothService} from "./bluetooth/service/bluetooth.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MainMenuComponent,
        BluetoothComponent,
        BluetoothScanComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ElectronService,
        BluetoothService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
