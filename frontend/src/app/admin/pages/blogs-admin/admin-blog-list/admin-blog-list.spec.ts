import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogList } from './admin-blog-list';

describe('AdminBlogList', () => {
  let component: AdminBlogList;
  let fixture: ComponentFixture<AdminBlogList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBlogList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBlogList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
