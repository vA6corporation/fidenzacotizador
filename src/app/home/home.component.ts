import { Component } from '@angular/core';
import { QuoterComponent } from "../quoter/quoter.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.sass',
    imports: [QuoterComponent]
})
export class HomeComponent {

}
