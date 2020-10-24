import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSubCategoryComponent } from './create-update-sub-category.component';

describe('CreateUpdateSubCategoryComponent', () => {
  let component: CreateUpdateSubCategoryComponent;
  let fixture: ComponentFixture<CreateUpdateSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
