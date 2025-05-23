import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiconComponent } from './graphicon.component';

describe('GraphiconComponent', () => {
  let component: GraphiconComponent;
  let fixture: ComponentFixture<GraphiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
