import {Component, Input, OnInit} from '@angular/core';
import {DeviceProps} from "../../service/bluetooth.service";

@Component({
    selector: 'app-bluetooth-device',
    templateUrl: './bluetooth-device.component.html',
    styleUrls: ['./bluetooth-device.component.scss']
})
export class BluetoothDeviceComponent implements OnInit {

    @Input()
    public device: DeviceProps;


    constructor() {
    }

    ngOnInit() {
    }

}
