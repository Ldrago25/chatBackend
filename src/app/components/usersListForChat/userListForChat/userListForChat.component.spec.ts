/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserListForChatComponent } from './userListForChat.component';

describe('UserListForChatComponent', () => {
  let component: UserListForChatComponent;
  let fixture: ComponentFixture<UserListForChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListForChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListForChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
