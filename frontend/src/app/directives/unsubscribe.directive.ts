import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class UnsubscribeDirective implements OnDestroy {
    unsubscribe: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
