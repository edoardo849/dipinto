
import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { Router, OnActivate, ComponentInstruction } from 'angular2/router';

import {EventEmitter} from 'angular2/core';
import {EmitterService} from '../common/emitter-service';

import { Question, QuestionComponent } from '../question/question';

let template = require('./play.html');
let styles = require('./play.css');

@Component({
    selector: 'play'
})

@View({
    directives: [CORE_DIRECTIVES, QuestionComponent],
    template: template,
    styles: [styles]
})

export class Play implements OnActivate {

    static MAX_TRIALS = 3;

    emitter: EventEmitter<any> = EmitterService.get('channel_1');
    response: string;
    api: string;

    questionPoolSize: number;

    questions: Question[];
    challenge: Object;
    trials: number;
    points: number;

    hasAnswered: boolean;
    isCorrect: boolean;

    constructor(public router: Router, public http: Http) {
        this.questionPoolSize = 4;
        this.hasAnswered = false;
        this.isCorrect = false;

        this.emitter.subscribe(rsp => {
            this.handleResponse(rsp);
        });

        this._setupGame();
    }

    routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
        return this._callApi();
    }

    reloadQuestion() {
        this._callApi();
    }

    handleResponse(rsp: Question) {
        this.hasAnswered = true;
        this.isCorrect = rsp.correct;
        this.questions.forEach(question => question.isDisabled = true);
    }

    _callApi() {
        this.questions = [];
        return new Promise((resolve) => {
            this
                .http
                .get(`http://localhost:3001/api/random-painting?n=${this.questionPoolSize}`
                )
                .map(response => response.json())
                .subscribe(
                data => {
                    let challenge;

                    data.forEach(
                        item =>
                            this.questions.push(
                                new Question(item.title, item.creator, item.image, item.attribution)
                                )
                        );
                    // Get randomly one question
                    challenge = this.questions[Math.ceil(Math.random() * data.length - 1)];
                    challenge.correct = true;
                    this.challenge = challenge;

                    resolve(true);
                },
                error => console.log(error)
                );
        });
    }

    /**
     * Setup the game for when the game starts or
     * for when the game is restarted again.
     * Useful in future releases of the game
     */
    _setupGame(): void {
        this.trials = 0;
        this.points = 0;
        this.challenge = {};
    }
}
