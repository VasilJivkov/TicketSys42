import { Component } from '@angular/core';

@Component({
    selector: 'app-layout-footer',
    templateUrl: './footer.component.html',
})

export class FooterComponent {
    public today: number = Date.now();
}
