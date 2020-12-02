import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductColorComponent } from './create-product-color.component';

describe('CreateProductColorComponent', () => {
  let component: CreateProductColorComponent;
  let fixture: ComponentFixture<CreateProductColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
