import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivePaymentComponent } from './receive-payment.component';

describe('ReceivePaymentComponent', () => {
  let component: ReceivePaymentComponent;
  let fixture: ComponentFixture<ReceivePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivePaymentComponent]
    });
    fixture = TestBed.createComponent(ReceivePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
