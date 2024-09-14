import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerComentarioPage } from './ver-comentario.page';

describe('VerComentarioPage', () => {
  let component: VerComentarioPage;
  let fixture: ComponentFixture<VerComentarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
