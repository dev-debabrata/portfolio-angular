import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResume } from './admin-resume';

describe('AdminResume', () => {
  let component: AdminResume;
  let fixture: ComponentFixture<AdminResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminResume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminResume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
