import {Injectable} from '@angular/core';
import {BluetoothService} from "../service/bluetooth.service";
import {MediaPlayer} from "./MediaPlayer";

@Injectable()
export class BluetoothMediaService {

    private bus: any;
    private getInterface: (service: string, path: string, _interface: string) => Promise<any>;


    constructor(private bt: BluetoothService) {
        this.bus = this.bt.getNative().getUserService().bus;
        this.getInterface = (service, path, _interface) => new Promise((resolve, reject) => this.bus.getInterface(service, path, _interface, (err, _i) => {
            if(err) reject(err);
            else resolve(_i);
        }))
    }

    public async createMediaPlayer(address: string): Promise<MediaPlayer> {
        address = BluetoothService.sanitizeAddress(address);
        console.log(address);
        const _interface = await this.getInterface('org.bluez', `/org/bluez/hci0/dev_${address}/player0`, 'org.bluez.MediaPlayer1');
        return new MediaPlayer(_interface);
    }
}
