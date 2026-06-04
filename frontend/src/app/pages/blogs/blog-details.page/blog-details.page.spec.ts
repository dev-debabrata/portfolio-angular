import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsPage } from './blog-details.page';

describe('BlogDetailsPage', () => {
  let component: BlogDetailsPage;
  let fixture: ComponentFixture<BlogDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
