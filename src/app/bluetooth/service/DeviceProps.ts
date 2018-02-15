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
