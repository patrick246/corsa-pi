import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothPlayerComponent } from './bluetooth-player.component';

describe('BluetoothPlayerComponent', () => {
  let component: BluetoothPlayerComponent;
  let fixture: ComponentFixture<BluetoothPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluetoothPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
