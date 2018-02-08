import {Component, OnInit} from '@angular/core';
import {BluetoothService, Device} from "../service/bluetooth.service";
import {Agent, Bluez} from "bluez";

class CPAgent extends Agent {
    constructor(bluez: Bluez, private bluetoothScanComponent: BluetoothScanComponent) {
        super(bluez, bluez.getUserServiceObject());
    }

    RequestPinCode(device, callback) {
        let alphanum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let pinNumber = "";
        for(let i = 0; i < 6; i++) {
            pinNumber += alphanum[Math.floor(Math.random() * alphanum.length)];
        }
        callback(null, pinNumber);
    }

    DisplayPinCode(device, pincode, callback) {
        callback();
    }

    RequestPasskey(device, callback) {
        callback(null, 1234);
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
export class BluetoothScanComponent implements OnInit {

    public devices: any[] = [];
    public paired: any[] = [];
    public discovering: boolean = false;

    constructor(private bt: BluetoothService) {
    }

    ngOnInit() {
        this.bt.getDevices().subscribe(devices => {
            this.devices = devices;
            console.log(this.devices);
        });
        this.bt.getPaired().subscribe(devices => {
            this.paired = devices;
            console.log(this.paired);
        });
        this.updateDiscovering();
    }

    async updateDiscovering() {
        this.discovering = await this.bt.isDiscovering();
        setTimeout(this.updateDiscovering.bind(this), 500);
    }

    async startDiscovering() {
        this.bt.startDiscovering();
    }

    async stopDiscovering() {
        this.bt.stopDiscovering();
    }

}
