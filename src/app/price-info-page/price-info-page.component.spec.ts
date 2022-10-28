import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceInfoPageComponent } from './price-info-page.component';

describe('PriceInfoPageComponent', () => {
  let component: PriceInfoPageComponent;
  let fixture: ComponentFixture<PriceInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
