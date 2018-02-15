import {Agent, Bluez} from "bluez";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BluetoothPairModalComponent} from "../bluetooth-scan/bluetooth-pair-modal/bluetooth-pair-modal.component";

export class CPAgent extends Agent {
    constructor(private bluez: Bluez, private modal: NgbModal) {
        super(bluez, bluez.getUserServiceObject());
        console.log('Agent created');
    }

    RequestPinCode(device, callback) {
        console.log('RequestPinCode', device);
        let alphanum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let pin = "";
        for (let i = 0; i < 6; i++) {
            pin += alphanum[Math.floor(Math.random() * alphanum.length)];
        }
        callback(null, pin);
    }

    DisplayPinCode(device, pincode, callback) {
        console.log('DisplayPinCode', device, pincode);
        callback();
    }

    RequestPasskey(device, callback) {
        console.log('RequestPasskey', device);
        let pin = "";
        for (let i = 0; i < 6; i++) {
            pin += Math.floor(Math.random() * 10);
        }
        callback(null, pin);
    }

    DisplayPasskey(device, passkey, entered, callback) {
        console.log('DisplayPasskey', device, passkey, entered);
        callback();
    }

    async RequestConfirmation(device, passkey, callback) {
        console.log('RequestConfirmation', device, passkey);
        const modalRef = this.modal.open(BluetoothPairModalComponent);
        modalRef.componentInstance.device = device;
        modalRef.componentInstance.passkey = passkey;

        modalRef.componentInstance.deviceProps = await this.bluez.getDevice(device);

        return modalRef.result.then(() => {
            callback();
        }, () => {
            callback(new Error('User declined'));
        });
    }

    RequestAuthorization(device, callback) {
        console.log('RequestAuthorization', device);
        callback();
    }

    AuthorizeService(device, uuid, callback) {
        console.log('AuthorizeService', device, uuid);
        callback();
    }

    Cancel(callback) {
        console.log('Cancel');
        callback();
    }
}
