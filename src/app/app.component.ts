import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    var scrollContainer = document.getElementsByClassName('scroll-container')[0];
    scrollContainer.addEventListener('scroll', e => {
      if(e && e.target) {
        var scrollTop = (e.target as HTMLDivElement).scrollTop;
        var elementScrollMax: number = (e.target as HTMLDivElement).scrollHeight - (e.target as HTMLDivElement).clientHeight;
        var scrollBottom = elementScrollMax - scrollTop;
        (scrollContainer as HTMLDivElement).setAttribute('topScroll', scrollTop.toString());
        (scrollContainer as HTMLDivElement).setAttribute('bottomScroll', scrollBottom.toString());
      }
    });

    //set initial attributes
    var scrollTop = 0;
    var elementScrollMax: number = (scrollContainer as HTMLDivElement).scrollHeight - (scrollContainer as HTMLDivElement).clientHeight;
    var scrollBottom = elementScrollMax - scrollTop;
    (scrollContainer as HTMLDivElement).setAttribute('topScroll', scrollTop.toString());
    (scrollContainer as HTMLDivElement).setAttribute('bottomScroll', scrollBottom.toString());
    // or -> this.scrollTo(100); to trigger the first scroll event listener

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
