import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template:  `
  <div> 
    <h1> {{title}} </h1>
    <pm-student></pm-student>
  </div>
  `
})
export class AppComponent{
  title : string = 'Student Profile';
}
