import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class ProfileDataResolver implements Resolve<any>{

    constructor(
    ) { }

    resolve() {
    };

}
