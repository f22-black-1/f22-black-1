import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Login } from '../login';

>>>>>>> main

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
<<<<<<< HEAD
  
})
export class LoginComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

 

=======
})
export class LoginComponent implements OnInit {
    
  model = new Login('PestPatrolUser', 'Passcode');

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {}

  submitted = false;
  onSubmit() { this.submitted = true; }
   
>>>>>>> main
}
