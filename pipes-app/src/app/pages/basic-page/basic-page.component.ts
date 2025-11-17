import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe,
    DatePipe
  ],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {
  nameLower = signal('camila')
  nameUpper = signal('CAMILA')
  fullName = signal('cAMilA ANtoNeLla')

  customDate = signal(new Date())

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date())
    }, 1000);

    onCleanup(() => {
      clearInterval(interval)
    })
  })
}
