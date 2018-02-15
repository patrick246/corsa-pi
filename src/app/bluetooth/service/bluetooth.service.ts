import {Injectable} from '@angular/core';
import {Adapter, Agent, Bluez, Device} from "bluez";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DeviceProps} from "./DeviceProps";
import {CPAgent} from "./CPAgent";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";



@Injectable()
export class BluetoothService {
    private initCalled: boolean = false;
    private bt = new Bluez();
    private deviceArray: DeviceProps[] = [];
    private pairedArray: DeviceProps[] = [];
    private devices: Subject<DeviceProps[]> = new BehaviorSubject([]);
    private paired: Subject<DeviceProps[]> = new BehaviorSubject<DeviceProps[]>([]);
    private adapter: Adapter = null;
    private shouldUpdate: boolean = false;
    private connectedDevice: Device = null;

    constructor(private modalService: NgbModal) {
        this.bt.on('device', this.onDeviceDetected.bind(this));
    }

    private async getAdapter() {
        if(this.adapter === null && !this.initCalled) {
            await this.init();
        }
        return this.adapter;
    }

    private async init() {
        console.log('Initializing bluetooth library');
        this.initCalled = true;
        await this.bt.init();
        this.adapter = await this.bt.getAdapter('hci0');
        await this.registerAgent(new CPAgent(this.bt, this.modalService));
    }

    private async updateDevices() {
        let devices: any[] = await Promise.all(this.deviceArray.map(device => alwaysResolve(this.bt.getDevice(device.Address))));
        this.deviceArray = await Promise.all(devices.filter(device => device != null).map(device => device.getProperties()));
        this.devices.next(this.deviceArray);
        this.pairedArray = this.deviceArray.filter(device => device.Paired);
        this.paired.next(this.pairedArray);

        const connected = this.deviceArray.filter(device => device.Connected);
        if(connected.length === 1) {
            this.connectedDevice = await this.bt.getDevice(connected[0].Address);
        }

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

    public async setDiscoverable(status: boolean) {
        const adapter = await this.getAdapter();
        await adapter.Discoverable(status);
    }


    public async removeDevice(address: string) {
        const adapter = await this.getAdapter();
        address = BluetoothService.sanitizeAddress(address);

        await adapter.RemoveDevice(`/org/bluez/hci0/${address}`);
    }

    public async pairDevice(address: string): Promise<void> {
        address = BluetoothService.sanitizeAddress(address);
        const device: Device = await this.bt.getDevice(address);
        await device.Pair();
        await device.Trusted(true);
    }

    public async connect(address: string): Promise<void> {
        address = BluetoothService.sanitizeAddress(address);
        const device: Device = await this.bt.getDevice(address);
        await device.Trusted(true);
        console.log('Trying to connect');
        await device.Connect();
        console.log('Connect finished');
        if(await device.Connected()) {
            this.connectedDevice = device;
        }
    }

    public async disconnect(address: string): Promise<void> {
        address = BluetoothService.sanitizeAddress(address);
        const device: Device = await this.bt.getDevice(address);
        await device.Disconnect();
        if(!(await device.Connected())) {
            this.connectedDevice = null;
        }
    }

    public static sanitizeAddress(address: string): string {
        return address.replace(/:/g, '_')
            .replace(/-/g, '_')
            .toUpperCase();
    }

    public async registerAgent(agent: Agent) {
        await this.bt.registerAgent(agent, "DisplayYesNo");
    }

    public async getDevice(address: string): Promise<DeviceProps> {
        address = BluetoothService.sanitizeAddress(address);
        const device: Device = await this.bt.getDevice(address);
        return await device.getProperties();
    }

    public getNative(): Bluez {
        return this.bt;
    }

    public isConnected(): boolean {
        return this.connectedDevice !== null;
    }

    public getConnected(): Device {
        return this.connectedDevice;
    }
}

function alwaysResolve<T>(promise: Promise<T>): Promise<T | null> {
    return new Promise(resolve => {
        promise.then(resolve).catch(() => resolve(null));
    });
}
