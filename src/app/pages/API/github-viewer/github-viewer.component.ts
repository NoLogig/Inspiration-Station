import { Component, OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'nlg-github-viewer',
  templateUrl: './github-viewer.component.html',
  styleUrls: ['./github-viewer.component.scss']
})
export class GithubViewerComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  public gitUser$;
  public hide = true;
  public noUserFound: { err404: string };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.max(12)
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient) { }

  searchGitUser(gitUser) {
    
    this.http.get(`https://api.github.com/users/${gitUser}`).subscribe(res => {
      this.gitUser$ = res;
    }, err => {
      this.noUserFound = { err404: 'User Not Found' };
      this.emailFormControl.setErrors(this.noUserFound);
    });
  }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {              console.log('GithubViewerComponent ngOnInit'); }
  ngAfterViewChecked(): void {    console.log('GithubViewerComponent ngAfterViewChecked'); }
  ngAfterContentChecked(): void { console.log('GithubViewerComponent ngAfterContentChecked'); }
  ngAfterContentInit(): void {    console.log('GithubViewerComponent ngAfterContentInit'); }
  ngAfterViewInit(): void {       console.log('GithubViewerComponent ngAfterViewInit'); }
  ngOnChanges(): void {           console.log('GithubViewerComponent ngOnChanges'); }
  ngOnDestroy(): void {           console.log('GithubViewerComponent ngOnDestroy'); }

}
