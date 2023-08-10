import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UnsubscribeDirective } from 'src/app/directives/unsubscribe.directive';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
    selector: 'app-page-loader',
    templateUrl: './page-loader.component.html',
    styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent
    extends UnsubscribeDirective
    implements OnInit
{
    public showLoader = false;

    constructor(private loaderService: LoaderService) {
        super();
    }

    ngOnInit(): void {
        this.loaderService.loaderState
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((showLoader: boolean) => {
                this.showLoader = showLoader;
            });
    }
}
