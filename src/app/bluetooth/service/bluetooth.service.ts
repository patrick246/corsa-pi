import {Injectable} from '@angular/core';
import {Adapter, Agent, Bluez} from "bluez";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export interface DeviceProps {
    Address: string;
    AddressType: string;
    Name?: string;
    Icon?: string;
    Class?: number;
    Appearance?: number;
    UUIDs?: string[];
    Paired: boolean;
    Connected: boolean;
    Trusted: boolean;
    Blocked: boolean;
    Alias: string;
    RSSI?: number;

}

@Injectable()
export class BluetoothService {

    private bt = new Bluez();
    private deviceArray: DeviceProps[] = [];
    private pairedArray: DeviceProps[] = [];
    private devices: Subject<DeviceProps[]> = new BehaviorSubject([]);
    private paired: Subject<DeviceProps[]> = new BehaviorSubject<DeviceProps[]>([]);
    private adapter: Adapter = null;
    private shouldUpdate: boolean = false;

    constructor() {
        this.bt.on('device', this.onDeviceDetected.bind(this));
    }

    private async getAdapter() {
        if(this.adapter === null) {
            await this.init();
        }
        return this.adapter;
    }

    private async init() {
        console.log('Initializing bluetooth library');
        await this.bt.init();
        this.adapter = await this.bt.getAdapter('hci0');
    }

    private async updateDevices() {
        let devices: any[] = await Promise.all(this.deviceArray.map(device => alwaysResolve(this.bt.getDevice(device.Address))));
        this.deviceArray = await Promise.all(devices.filter(device => device != null).map(device => device.getProperties()));
        this.devices.next(this.deviceArray);
        if(this.shouldUpdate)
            setTimeout(this.updateDevices.bind(this), 2000);
    }

    private async onDeviceDetected(address, props) {
        if(props.Paired) {
            this.pairedArray.push(props);
            this.paired.next(this.pairedArray);
        }
        this.deviceArray.push(props);
        this.deviceArray = this.deviceArray.sort((d1, d2) => d2.RSSI - d1.RSSI);
        this.devices.next(this.deviceArray);
    }

    public getDevices(): Observable<any[]> {
        return this.devices;
    }

    public getPaired(): Observable<any[]> {
        return this.paired;
    }

    public async isDiscovering(): Promise<boolean> {
        return await (await this.getAdapter()).Discovering();
    }

    public async startDiscovering() {
        this.shouldUpdate = true;
        await (await this.getAdapter()).StartDiscovery();
        await this.updateDevices();
    }

    public async stopDiscovering() {
        this.shouldUpdate = false;
        return await (await this.getAdapter()).StopDiscovery();
    }


    public async removeDevice(address: string) {
        const adapter = await this.getAdapter();
        address = address
            .replace(':', '_')
            .replace('-', '_')
            .toUpperCase();

        await adapter.RemoveDevice(`/org/bluez/hci0/${address}`);
    }

    public async registerAgent(agent: Agent) {
        await this.bt.registerAgent(agent, "DisplayYesNo");
    }

}

function alwaysResolve<T>(promise: Promise<T>): Promise<T | null> {
    return new Promise(resolve => {
        promise.then(resolve).catch(() => resolve(null));
    });
}
