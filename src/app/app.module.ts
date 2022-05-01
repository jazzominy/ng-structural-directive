import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomDirective } from './directive/custom.directive';
import { ForEachDirective } from './directive/for-each.directive';

function getAppInitializer () {
  return () => new Promise((done, oops) => {
    setTimeout(() => {
      done('Continue bootstrap')
    }, 5000);
  })
}
@NgModule({
  declarations: [
    AppComponent,
    CustomDirective,
    ForEachDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: getAppInitializer,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
