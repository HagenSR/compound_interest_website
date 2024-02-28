import { Pipe, PipeTransform } from '@angular/core';
/* eslint-disable  @typescript-eslint/no-explicit-any */
@Pipe({
    standalone: true,
    name: 'nullsafeArray'
})
export class NullsafeArray implements PipeTransform {
    transform(value: any[] | null): any[] {
        return value !== null ? value : []
    }
}