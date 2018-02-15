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
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BluetoothDeviceComponent } from './bluetooth/bluetooth-scan/bluetooth-device/bluetooth-device.component';
import { BluetoothPlayerComponent } from './bluetooth/bluetooth-player/bluetooth-player.component';
import { BluetoothPairModalComponent } from './bluetooth/bluetooth-scan/bluetooth-pair-modal/bluetooth-pair-modal.component';
import {IsConnectedGuard} from "./bluetooth/bluetooth-player/guard/is-connected.guard";
import {BluetoothMediaService} from "./bluetooth/media-service/bluetooth-media.service";

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
        BluetoothScanComponent,
        BluetoothDeviceComponent,
        BluetoothPlayerComponent,
        BluetoothPairModalComponent
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
        }),
        NgbModule.forRoot()
    ],
    providers: [
        ElectronService,
        BluetoothService,
        IsConnectedGuard,
        BluetoothMediaService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        BluetoothPairModalComponent
    ]
})
export class AppModule {
}
