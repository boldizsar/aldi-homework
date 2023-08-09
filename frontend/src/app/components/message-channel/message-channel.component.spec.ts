import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChannelComponent } from './message-channel.component';

describe('MessageChannelComponent', () => {
    let component: MessageChannelComponent;
    let fixture: ComponentFixture<MessageChannelComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MessageChannelComponent]
        });
        fixture = TestBed.createComponent(MessageChannelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
