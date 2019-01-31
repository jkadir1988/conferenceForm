import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, EmailValidator, FormArray } from '@angular/forms';
import { forbiddenConferenceNameValidator } from './shared/conferenceName.validator';
import { ConferenceDateValidator } from './shared/conferenceDate.validator';
import { ConferenceService } from './conference.service';
import { Conference } from './conference';
import { Time } from '@angular/common'


@Component({
  selector: 'conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {

  conferenceForm: FormGroup;

  conferences: Conference[] = [];

  defaultDateTime: string = "2099-01-01T01:00";

  dateOfToday = new Date(Date.now());
  dateOfTomorrow = new Date(this.dateOfToday.setDate(this.dateOfToday.getDate() + 1));
  selectedDate = new Date();

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

  minDateEndDate(event) {
    event.target.min = this.selectedDate;
  }

  maxDateDeadlineDate(event) {
    let date: Date = new Date(this.selectedDate);
    let validDate = new Date(date.setDate(date.getDate() - 1));
    let validMonth = (validDate.getMonth() + 1) < 10 ? "0" + (validDate.getMonth() + 1) : (validDate.getMonth() + 1);
    let validDay = validDate.getDate() < 10 ? "0" + validDate.getDate() : validDate.getDate();
    event.target.max = validDate.getFullYear() + "-" + validMonth + "-" + validDay;
  }

  minTimeEndDate(event) {
    // event.target.min = this.selectedTime;
  }

  constructor(private fb: FormBuilder, private conferenceService: ConferenceService) { }

  ngOnInit() {
    this.conferenceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), forbiddenConferenceNameValidator(/javiel/)]],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      deadlineDate: [''],
      deadlineTime: [''],
      // stage: [''],
      alternateStages: this.fb.array([]),
      // category: [''],
      alternateCategory: this.fb.array([])
    },
      { validator: ConferenceDateValidator });
  }

  createConference() {
    let conference: Conference = this.conferenceForm.value;
    if (this.conferenceForm.get('startDate') != null) {
      if (this.conferenceForm.get('startDate').value != "") {
        conference.startDate = this.defaultDateTime;
      } else {
        conference.startDate = this.conferenceForm.get('startDate').value + "T" + this.conferenceForm.get('startTime').value;
      }
    }
    if (this.conferenceForm.get('endDate') != null) {
      if (this.conferenceForm.get('endDate').value != "") {
        conference.endDate = this.defaultDateTime;
      } else {
        conference.endDate = this.conferenceForm.get('endDate').value + "T" + this.conferenceForm.get('endTime').value;
      }
    }
    if (this.conferenceForm.get('deadlineDate') != null) {
      if (this.conferenceForm.get('deadlineDate').value != "") {
        conference.deadlinePresentationDraft = this.defaultDateTime;
      } else {
        conference.deadlinePresentationDraft = this.conferenceForm.get('deadlineDate').value + "T" + this.conferenceForm.get('deadlineTime').value;
      }
    }

    // if (this.conferenceForm.get('startDate') == null || this.conferenceForm.get('startTime') == null) {
    //   conference.startDate = this.defaultDateTime;
    // } else {
    //   conference.startDate = this.conferenceForm.get('startDate').value + "T" + this.conferenceForm.get('startTime').value;
    // }
    // if (this.conferenceForm.get('endDate') == null || this.conferenceForm.get('endTime') == null) {
    //   conference.endDate = this.defaultDateTime;
    // } else {
    //   conference.endDate = this.conferenceForm.get('endDate').value + "T" + this.conferenceForm.get('endTime').value;
    // }
    // if (this.conferenceForm.get('deadlineDate') == null || this.conferenceForm.get('deadlineTime') == null) {
    //   conference.deadlinePresentationDraft = this.defaultDateTime;
    // } else {
    //   conference.deadlinePresentationDraft = this.conferenceForm.get('deadlineDate').value + "T" + this.conferenceForm.get('deadlineTime').value;
    // }
    this.addConference(conference);
    console.log("jojo " + conference.categories);
    console.log("hallo" + this.conferences.values);
  }

  addConference(conference) {
    this.conferenceService.postConference(conference)
      .subscribe(conference => this.conferences.push(conference));
  }

  loadApi() {
    this.conferenceForm.patchValue({ //patchValue / setValue
      name: 'Topiconf',
      startDate: '2019-01-09',
      startTime: '23:00',
      endDate: '2019-01-09',
      endTime: '23:00',
      deadlineDate: '2019-01-09',
      deadlineTime: '23:00',
    });
  }
}
