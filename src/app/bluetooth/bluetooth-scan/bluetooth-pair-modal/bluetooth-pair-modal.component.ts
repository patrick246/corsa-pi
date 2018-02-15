import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DeviceProps} from "../../service/DeviceProps";

@Component({
    selector: 'app-bluetooth-pair-modal',
    templateUrl: './bluetooth-pair-modal.component.html',
    styleUrls: ['./bluetooth-pair-modal.component.scss']
})
export class BluetoothPairModalComponent implements OnInit, OnChanges {

    @Input()
    public device: string;

    @Input()
    public passkey: number;

    public deviceProps: DeviceProps;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }


    async ngOnChanges(changes: SimpleChanges): Promise<void> {
    }
}
