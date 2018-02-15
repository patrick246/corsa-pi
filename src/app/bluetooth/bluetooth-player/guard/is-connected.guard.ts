import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BluetoothService} from "../../service/bluetooth.service";

@Injectable()
export class IsConnectedGuard implements CanActivate {
    constructor(private bt: BluetoothService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(!this.bt.isConnected()) {
            this.router.navigateByUrl('/bluetooth/scan');
            return false;
        }
        return true;
    }
}
