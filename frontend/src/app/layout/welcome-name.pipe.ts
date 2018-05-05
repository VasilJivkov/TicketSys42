import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'welcomeName'
})
export class WelcomeNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `Welcome, ${value}!`
  }

}
