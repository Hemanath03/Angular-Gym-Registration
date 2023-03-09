import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  packages: string[] = ['Monthly', 'Quaterly', 'Yearly'];
  shifts: string[] = ['Morning', 'Noon', 'Midnoon', 'Evening', 'Night']
  answers: string[] = ['Yes', 'No']
  heightvalue: any;



  constructor(public fb: FormBuilder, private api: ApiService, public activate: ActivatedRoute,private forward:Router) { }
  public registrationForm!: FormGroup;
  public userId: any;
  public isUpdate: boolean = false;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]{3,10}")])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z]{3,10}")])],
      mobile: ['', Validators.compose([Validators.pattern("[0-9]{10}")])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bmi: [''],
      bmiResult: [''],
      gender: ['', Validators.required],
      require: ['', Validators.required],
      package: ['', Validators.required],
      shift: ['', Validators.required],
      answer: ['', Validators.required],
      date: ['', Validators.required]

    })
    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res)
    });

    this.activate.params.subscribe(val => {
      this.userId = val['id'];
      this.api.getResgisterId(this.userId)
        .subscribe(res => {
          // console.log(res);
          //console.log(this.fillForm(res))
          this.isUpdate = true
          this.fillForm(res)
        })
    })
  }

  fillForm(user: User) {
    this.registrationForm.setValue({
      firstname: user.firstname,
      lastname: user.lastname,
      mobile: user.mobile,
      email: user.email,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      require: user.require,
      package: user.package,
      shift: user.shift,
      answer: user.answer,
      date: user.date
    })
  }

  submit() {
    //console.log(this.registrationForm.value)
    this.api.postRegisterUser(this.registrationForm.value).subscribe()
    this.registrationForm.reset()
  }

  update(){
    this.api.updateUser(this.registrationForm.value,this.userId).subscribe()
    this.registrationForm.reset();
    this.forward.navigate(['list'])
  }

  calculateBmi(heightvalue: number) {
    const weight = this.registrationForm.value.weight
    const height = this.registrationForm.value.height
    const BMI = weight / (height * height) * 100;
    this.registrationForm.controls['bmi'].patchValue(BMI)

    switch (true) {
      case BMI < 18.5: this.registrationForm.controls['bmiResult'].patchValue("underWeight")
        break;
      case (BMI > 18.5 && BMI < 35): this.registrationForm.controls['bmiResult'].patchValue("normal")
        break;
      case BMI > 35: this.registrationForm.controls['bmiResult'].patchValue("overWeight")
        break;
      default: this.registrationForm.controls['bmiResult'].patchValue("obesity")
        break;

    }
  }

}
