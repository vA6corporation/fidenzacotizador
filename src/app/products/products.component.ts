import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [],
    templateUrl: './products.component.html',
    styleUrl: './products.component.sass'
})
export class ProductsComponent {
    toRedirect = 'https://www.google.com';

    @Input() insurance = {
        id: '',
        name: '',
        coverages: 0,
        deductuble: 0,
        charge: 0,
        insurances: '',
        imgPath: ''
    }
}
