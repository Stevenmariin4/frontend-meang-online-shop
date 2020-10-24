import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateColorsComponent } from './create-update-colors.component';

describe('CreateUpdateColorsComponent', () => {
  let component: CreateUpdateColorsComponent;
  let fixture: ComponentFixture<CreateUpdateColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
