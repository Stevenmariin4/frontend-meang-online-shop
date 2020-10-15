import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePromotionsComponent } from './create-update-promotions.component';

describe('CreateUpdatePromotionsComponent', () => {
  let component: CreateUpdatePromotionsComponent;
  let fixture: ComponentFixture<CreateUpdatePromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdatePromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
