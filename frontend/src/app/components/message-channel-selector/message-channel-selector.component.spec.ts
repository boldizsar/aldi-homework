import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageChannelSelectorComponent } from './message-channel-selector.component';

describe('MessageChannelSelectorComponent', () => {
    let component: MessageChannelSelectorComponent;
    let fixture: ComponentFixture<MessageChannelSelectorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MessageChannelSelectorComponent]
        });
        fixture = TestBed.createComponent(MessageChannelSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
