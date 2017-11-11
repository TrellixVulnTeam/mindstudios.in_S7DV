import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photoURL: string;
  displayName: string;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
     if(res === null) {
      this.goToLogin();
     } else {
      this.ngZone.run(() => {
        this.displayName = res.displayName;
        this.photoURL = res.photoURL;
        this.router.navigateByUrl('');
      });
     }
    });
  }

  goToLogin() {
    console.log('aa');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
