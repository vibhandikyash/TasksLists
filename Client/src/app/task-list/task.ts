import { TaskPhases } from './task-phases.enum';

export class Task {
    id: string;
    title: string;
    description: string;
    phase: TaskPhases;
    _id?: string;
}
