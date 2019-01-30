import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, EmailValidator, FormArray } from '@angular/forms';
import { forbiddenConferenceNameValidator } from './shared/conferenceName.validator';
import { ConferenceDateValidator } from './shared/conferenceDate.validator';
import { ConferenceService } from './conference.service';
import { Conference } from './conference';

@Component({
  selector: 'conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  conferenceForm: FormGroup;

  conferences: Conference[] = [];

  get name() {
    return this.conferenceForm.get('name');
  }

  get stageName() {
    return this.conferenceForm.get('stage');
  }

  get alternateStages() {
    return this.conferenceForm.get('alternateStages') as FormArray;
  }

  addAlternateStages() {
    this.alternateStages.push(this.fb.control(''));
  }

  removeAlternateStages(i: number) {
    this.alternateStages.removeAt(i);
  }

  get category() {
    return this.conferenceForm.get('category');
  }

  get alternateCategory() {
    return this.conferenceForm.get('alternateCategory') as FormArray;
  }

  addAlternateCategory() {
    this.alternateCategory.push(this.fb.control(''));
  }

  removeAlternateCategory(i: number) {
    this.alternateCategory.removeAt(i);
  }

  constructor(private fb: FormBuilder, private conferenceService: ConferenceService) { }

  createConference() {
    console.log(this.conferenceForm.value);
    // this.addConference(this.conferenceForm.value);
    let conference: Conference = this.conferenceForm.value;
    this.addConference(conference);
    console.log(">>>>>>>>>>" + conference.name);
  }

  addConference(conference) {
    this.conferenceService.postConference(conference)
      .subscribe(conference => this.conferences.push(conference));
  }

  ngOnInit() {
    this.conferenceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), forbiddenConferenceNameValidator(/javiel/)]],
      startDate: [''],
      endDate: [''],
      deadlineDate: [''],
      // stageCheck: [false],
      stage: [''],
      alternateStages: this.fb.array([]),
      // categoryCheck: [false],
      category: [''],
      alternateCategory: this.fb.array([])
    },
      { validator: ConferenceDateValidator });

    //   this.conferenceForm.get('stageCheck').valueChanges
    //     .subscribe(checkedValue => {
    //       const stage = this.conferenceForm.get('stage');
    //       if (checkedValue) {
    //         stage.setValidators(Validators.required);
    //       } else {
    //         stage.clearValidators();
    //       }
    //       stage.updateValueAndValidity();
    //     });

    //   this.conferenceForm.get('categoryCheck').valueChanges
    //     .subscribe(checkedValue => {
    //       const category = this.conferenceForm.get('category');
    //       if (checkedValue) {
    //         category.setValidators(Validators.required);
    //       } else {
    //         category.clearValidators();
    //       }
    //       category.updateValueAndValidity();
    //     });
    // }
  }

  loadApi() {
    this.conferenceForm.patchValue({ //patchValue / setValue
      name: 'Topiconf',
      conferenceDate: {
        startDate: '2019-01-09',
        endDate: '2019-01-09',
        deadlineDate: '2019-01-09'
      },
      // stageCheck: [true],
      stage: ['jojo'],
      // categoryCheck: [true],
      category: ['hallo']
    });
  }

  // resetApi() {
  //   this.conferenceForm.patchValue({
  //     conferenceName: '',
  //     conferenceDate: {
  //       startDate: '',
  //       endDate: '',
  //       deadlineDate: ''
  //     },
  //     // stageCheck: [false],
  //     stage: [''],
  //     // categoryCheck: [false],
  //     category: ['']
  //   });
  // }
}
