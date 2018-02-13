import {Component, OnDestroy, OnInit} from '@angular/core';
import {BluetoothService, DeviceProps} from "../service/bluetooth.service";
import {Agent, Bluez} from "bluez";

class CPAgent extends Agent {
    constructor(bluez: Bluez, private bluetoothScanComponent: BluetoothScanComponent) {
        super(bluez, bluez.getUserServiceObject());
    }

    RequestPinCode(device, callback) {
        let alphanum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let pin = "";
        for(let i = 0; i < 6; i++) {
            pin += alphanum[Math.floor(Math.random() * alphanum.length)];
        }
        callback(null, pin);
    }

    DisplayPinCode(device, pincode, callback) {
        callback();
    }

    RequestPasskey(device, callback) {
        let pin = "";
        for(let i = 0; i < 4; i++) {
            pin += Math.floor(Math.random() * 10);
        }
        callback(null, pin);
    }

    DisplayPasskey(device, passkey, entered, callback) {
        callback();
    }

    RequestConfirmation(device, passkey, callback) {
        callback();
    }

    RequestAuthorization(device, callback) {
        callback();
    }

    AuthorizeService(device, uuid, callback) {
        callback();
    }

    Cancel(callback) {
        callback();
    }
}

@Component({
    selector: 'app-bluetooth-scan',
    templateUrl: './bluetooth-scan.component.html',
    styleUrls: ['./bluetooth-scan.component.scss']
})
export class BluetoothScanComponent implements OnInit, OnDestroy {

    public devices: any[] = [];
    public paired: any[] = [];
    public discovering: boolean = false;

    constructor(private bt: BluetoothService) {
    }

    async ngOnInit() {
        this.bt.getDevices().subscribe(devices => {
            this.devices = devices;
            console.log('Devices', this.devices);
        });
        this.bt.getPaired().subscribe(devices => {
            this.paired = devices;
            console.log('Paired', this.paired);
        });
        await this.startDiscovering();
    }


    async ngOnDestroy() {
        await this.stopDiscovering();
    }

    async startDiscovering() {
        this.bt.startDiscovering();
    }

    async stopDiscovering() {
        this.bt.stopDiscovering();
    }

}
