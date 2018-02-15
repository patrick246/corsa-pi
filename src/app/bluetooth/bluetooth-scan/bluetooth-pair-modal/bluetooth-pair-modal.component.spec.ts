import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothPairModalComponent } from './bluetooth-pair-modal.component';

describe('BluetoothPairModalComponent', () => {
  let component: BluetoothPairModalComponent;
  let fixture: ComponentFixture<BluetoothPairModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothPairModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothPairModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
