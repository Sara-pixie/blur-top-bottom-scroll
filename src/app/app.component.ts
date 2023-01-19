import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  status?: 'top' | 'bottom' | 'middle';

  constructor() {}

  ngAfterViewInit(): void {
    var scrollContainer = document.getElementsByClassName('scroll-container')[0];
    scrollContainer.addEventListener('scroll', e => {
      if(e && e.target) {
        var scrollTop = (e.target as HTMLDivElement).scrollTop;
        var elementScrollMax: number = (e.target as HTMLDivElement).scrollHeight - (e.target as HTMLDivElement).clientHeight;
        var scrollBottom = elementScrollMax - scrollTop;
        if(scrollBottom.toString().startsWith('0.')) scrollBottom = 0; // because I added border to scrollContainer and sometimes JS makes weird calculations
        (scrollContainer as HTMLDivElement).setAttribute('topScroll', scrollTop.toString());
        (scrollContainer as HTMLDivElement).setAttribute('bottomScroll', scrollBottom.toString());
        this.setStatus(scrollTop, scrollBottom);
      }
    });

    //set initial attributes
    var scrollTop = 0;
    var elementScrollMax: number = (scrollContainer as HTMLDivElement).scrollHeight - (scrollContainer as HTMLDivElement).clientHeight;
    var scrollBottom = elementScrollMax - scrollTop;
    (scrollContainer as HTMLDivElement).setAttribute('topScroll', scrollTop.toString());
    (scrollContainer as HTMLDivElement).setAttribute('bottomScroll', scrollBottom.toString());
    // or -> this.scrollTo(100); to trigger the first scroll event listener
    this.setStatus(scrollTop, scrollBottom);

  }

  setStatus(scrollTop: number, scrollBottom: number) {
    if(scrollTop === 0) this.status = 'top';
    if(scrollBottom === 0) this.status = 'bottom';
    if(scrollBottom != 0 && scrollTop != 0) this.status = 'middle';
  }

  scrollToTop() {
    this.scrollTo(0);
  }

  scrollToBottom() {
    var scrollContainer = document.getElementsByClassName('scroll-container')[0];
    var elementScrollMax: number = (scrollContainer as HTMLDivElement).scrollHeight - (scrollContainer as HTMLDivElement).clientHeight;
    this.scrollTo(elementScrollMax);
  }

  scrollTo(scroll: number) {
    var scrollContainer = document.getElementsByClassName('scroll-container')[0];
    scrollContainer.scrollTop = scroll;
  }

}
