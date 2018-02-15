import {inject, TestBed} from '@angular/core/testing';

import {BluetoothMediaService} from './bluetooth-media.service';

describe('BluetoothMediaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BluetoothMediaService]
        });
    });

    it('should be created', inject([BluetoothMediaService], (service: BluetoothMediaService) => {
        expect(service).toBeTruthy();
    }));
});
