import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuredImgComponent } from './secured-img.component';

describe('SecuredImgComponent', () => {
  let component: SecuredImgComponent;
  let fixture: ComponentFixture<SecuredImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuredImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecuredImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
