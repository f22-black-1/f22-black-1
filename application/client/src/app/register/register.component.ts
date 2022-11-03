import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Register} from '../register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model = new Register('Heather', 'Mallalieu', 'hmall001@odu.edu', 'PestPatrolUser', 'Passcode');

  constructor() {}

  ngOnInit(): void {}

  submitted = false;
  onSubmit() { this.submitted = true; }

}
