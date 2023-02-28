import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyDataComponent } from './hierarchy-data.component';

describe('HierarchyDataComponent', () => {
  let component: HierarchyDataComponent;
  let fixture: ComponentFixture<HierarchyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
