import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {BluetoothComponent} from "./bluetooth/bluetooth.component";
import {BluetoothScanComponent} from "./bluetooth/bluetooth-scan/bluetooth-scan.component";
import {BluetoothPlayerComponent} from "./bluetooth/bluetooth-player/bluetooth-player.component";
import {IsConnectedGuard} from "./bluetooth/bluetooth-player/guard/is-connected.guard";


const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent
    },
    {
        path: 'bluetooth',
        component: BluetoothComponent,
        children: [{
            path: 'scan',
            component: BluetoothScanComponent
        }, {
            path: 'play',
            component: BluetoothPlayerComponent,
            canActivate: [IsConnectedGuard]
        }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
