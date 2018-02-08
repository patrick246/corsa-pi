import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BluetoothScanComponent} from './bluetooth-scan.component';

describe('BluetoothScanComponent', () => {
    let component: BluetoothScanComponent;
    let fixture: ComponentFixture<BluetoothScanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BluetoothScanComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BluetoothScanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
