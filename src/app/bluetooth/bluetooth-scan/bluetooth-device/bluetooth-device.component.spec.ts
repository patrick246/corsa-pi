import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BluetoothDeviceComponent} from './bluetooth-device.component';

describe('BluetoothDeviceComponent', () => {
    let component: BluetoothDeviceComponent;
    let fixture: ComponentFixture<BluetoothDeviceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BluetoothDeviceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BluetoothDeviceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
