/* SystemJS module definition */
declare var nodeModule: NodeModule;

interface NodeModule {
    id: string;
}

declare var window: Window;

interface Window {
    process: any;
    require: any;
}

declare module "bluez" {
    import EventEmitter = NodeJS.EventEmitter;

    export class Adapter {
        constructor(interface_: any);
        public StartDiscovery(): Promise<void>;
        public StopDiscovery(): Promise<void>;
        public RemoveDevice(device: string | Device ): Promise<void>;
        public SetDiscoveryFilter(filter: any): Promise<void>;
        public GetDiscoveryFilters(): Promise<string[]>;

        public getProperties(): Promise<{[key: string]: any}>
        public getProperty(name: string): Promise<any>;
        public setProperty(name: string, value: any): Promise<void>;

        public Address(): Promise<string>;
        public Name(mode?: string): Promise<string>;
        public Alias(value?: string): Promise<string>;
        public Class(): Promise<number>;
        public Powered(mode?: boolean): Promise<boolean>;
        public Discoverable(mode?: boolean): Promise<boolean>;
        public Pairable(mode?: boolean): Promise<boolean>;
        public PairableTimeout(value?: number): Promise<number>;
        public DiscoverableTimeout(value?: number): Promise<number>;
        public Discovering(): Promise<boolean>;
        public UUIDs(): Promise<string[]>;
        public Modalias(): Promise<string | null>;
    }

    type Capabilities = "DisplayOnly" | "DisplayYesNo" | "KeyboardOnly" | "NoInputNoOutput" | "KeyboardDisplay";
    export class Bluez extends EventEmitter {
        constructor(options?: any);
        public init();
        public getAdapter(dev: string): Promise<Adapter>;
        public getDevice(address: string): Promise<Device>;
        public registerProfile(profile: string, options: any): Promise<void>;
        public registerSerialProfile(listener: any, mode: string, options: any): Promise<void>;
        public registerAgent(agent: Agent, capabilities: Capabilities): Promise<void>;
        public registerDefaultAgent(): Promise<void>;
        public getUserService(): any;
        public getUserServiceObject(): any;
        public onInterfacesAdded(path: string, interfaces: {[key: string]: any}): void;
        public onInterfaceRemoved(path: string, props: string[]): void;

    }

    export class Device {
        public Connect(): Promise<void>;
        public Disconnect(): Promise<void>;
        public ConnectProfile(uuid: string): Promise<void>;
        public DisconnectProfile(uuid: string): Promise<void>;
        public Pair(): Promise<void>;
        public CancelPairing(): Promise<void>;

        public getProperties(): Promise<any>;
        public getProperty(name: string): Promise<any>;
        public setProperty(name: string, value: any): Promise<void>;

        public Address(): Promise<string>;
        public Name(): Promise<string | null>;
        public Icon(): Promise<string | null>;
        public Class(): Promise<number | null>;
        public Appearance(): Promise<number | null>;
        public UUIDs(): Promise<string[] | null>;
        public Connected(): Promise<boolean>;
        public Trusted(value?: boolean): Promise<boolean>;
        public Blocked(value?: boolean): Promise<boolean>;
        public Alias(value?: string): Promise<string>;
        public Adapter(): Promise<string>;
        public LegacyPairing(): Promise<boolean>;
        public Modalias(): Promise<string | null>;
        public RSSI(): Promise<number | null>;
        public TxPower(): Promise<number | null>;
        public ManufacturerData(): Promise<{[key: number]: string}>;
        public ServiceData(): Promise<{[key: string]: string}>;
        public ServicesResolved(): Promise<boolean>;
        public AdvertisingFlags(): Promise<number[]>;
    }

    type CallbackFunction = (err?: Error, result?: any) => void;

    export class Agent {
        constructor(bluez: Bluez, DbusObject: any);
        public Release(cb: CallbackFunction): void;
        public RequestPinCode(device: Device, cb: CallbackFunction): void;
        public DisplayPinCode(device: Device, pincode: string, cb: CallbackFunction): void;
        public RequestPasskey(device: Device, cb: CallbackFunction): void;
        public DisplayPasskey(device: Device, passkey: number, entered: number, cb: CallbackFunction): void;
        public RequestConfirmation(device: Device, passkey: number, cb: CallbackFunction): void;
        public RequestAuthorization(device: Device, cb: CallbackFunction): void;
        public AuthorizeService(device: Device, uuid: string, cb: CallbackFunction): void;
        public Cancel(cb: CallbackFunction): void;
    }
}
