import {View, Component} from 'angular2/core';
import {EmitterService} from '../common/emitter-service';
import {EventEmitter} from 'angular2/core';

export class Question {

    title: string;
    image: string;
    creator: string;
    attribution: string;
    isDisabled: boolean;

    private _isCorrect: boolean;


    constructor(title: string, creator: string, image: string, attribution: string) {
        this.title = title;
        this.creator = creator;
        this.image = image;
        this.attribution = attribution;
        this._isCorrect = false;
        this.isDisabled = false;
    }

    set correct(correct: boolean) {
        this._isCorrect = correct;
    }

    get correct(): boolean {
        return this._isCorrect;
    }


}

@Component({
    selector: 'dipinto-question',
    inputs: ['question']
})
@View({
    template: `
        <div class="right floated content">
            <button
                class="circular ui icon button"
                [ngClass]="{
                    disabled : question.isDisabled,
                    positive : hasAnswered && question.correct,
                    negative : hasAnswered && !question.correct
                }"
                (click)="submitResponse(question)">
                <i class="icon" [ngClass]="{
                    help : !hasAnswered,
                    checkmark : hasAnswered && isCorrect,
                    remove : hasAnswered && !isCorrect
                }"></i>
            </button>
        </div>
        <div class="header">{{question.title}}</div>
        {{question.creator}}
    `
})
export class QuestionComponent {

    question: Question;

    //one of three: { wrong, unanswered, correct }
    statusClass: string;
    hasAnswered: boolean;
    isCorrect : boolean;
    emitter: EventEmitter<any> = EmitterService.get('channel_1');

    constructor() {
        this.statusClass = 'radio';
        this.hasAnswered = false;
    }

    handleHover() {
        console.log(1);
    }

    submitResponse(rsp: Question) {
        this.hasAnswered = true;
        this.isCorrect = rsp.correct;
        this.emitter.emit(rsp);
        //Prevent click propagation
        return false;
    }
}
