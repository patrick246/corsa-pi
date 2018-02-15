import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceProps} from "../../service/DeviceProps";

@Component({
    selector: 'app-bluetooth-device',
    templateUrl: './bluetooth-device.component.html',
    styleUrls: ['./bluetooth-device.component.scss']
})
export class BluetoothDeviceComponent implements OnInit {

    @Input()
    public device: DeviceProps;

    @Output()
    public onPair: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public onConnect: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public onDisconnect: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit() {
    }


    public pair() {
        this.onPair.emit();
    }

    public connect() {
        this.onConnect.emit();
    }

    public disconnect() {
        this.onDisconnect.emit();
    }
}
