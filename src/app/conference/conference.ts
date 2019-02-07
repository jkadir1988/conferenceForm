import { Stages } from './stages/stages';

export class Conference {
    id?: number;
    name: string;
    startDate: string;
    endDate: string;
    deadlinePresentationDraft: string;
    stages: Array<Stages>;
    categories: Array<String>;

}
