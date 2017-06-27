import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskPhaseFilter'
})
export class TaskPhaseFilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (value.length > 0)
      return value.filter(task => task.phase == args)
    else
      return [];
  }

}
