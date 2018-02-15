import {Component, OnDestroy, OnInit} from '@angular/core';
import {BluetoothService} from "../service/bluetooth.service";
import {DeviceProps} from "../service/DeviceProps";


@Component({
    selector: 'app-bluetooth-scan',
    templateUrl: './bluetooth-scan.component.html',
    styleUrls: ['./bluetooth-scan.component.scss']
})
export class BluetoothScanComponent implements OnInit, OnDestroy {

    public devices: DeviceProps[] = [];
    public paired: DeviceProps[] = [];

    constructor(private bt: BluetoothService) {
    }

    async ngOnInit() {
        this.bt.getDevices().subscribe(devices => {
            this.devices = devices;
        });
        this.bt.getPaired().subscribe(devices => {
            this.paired = devices;
        });
        await this.startDiscovering();
        await this.bt.setDiscoverable(true);
    }


    async ngOnDestroy() {
        await this.stopDiscovering();
        await this.bt.setDiscoverable(false);
    }

    async startDiscovering() {
        await this.bt.startDiscovering();
    }

    async stopDiscovering() {
        await this.bt.stopDiscovering();
    }

    async pair(device: DeviceProps) {
        await this.bt.pairDevice(device.Address);
    }

    async connect(device: DeviceProps) {
        await this.bt.connect(device.Address);
    }

    async disconnect(device: DeviceProps) {
        await this.bt.disconnect(device.Address);
    }
}
