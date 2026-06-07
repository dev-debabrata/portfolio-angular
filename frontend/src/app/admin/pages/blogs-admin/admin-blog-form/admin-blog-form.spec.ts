import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogForm } from './admin-blog-form';

describe('AdminBlogForm', () => {
  let component: AdminBlogForm;
  let fixture: ComponentFixture<AdminBlogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBlogForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBlogForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
