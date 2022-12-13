import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyUserAddComponent } from './family-user-add.component';

describe('FamilyUserAddComponent', () => {
  let component: FamilyUserAddComponent;
  let fixture: ComponentFixture<FamilyUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyUserAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
