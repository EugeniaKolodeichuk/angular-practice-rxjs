import { Component, OnInit } from '@angular/core';
import { filter, interval, map, tap, take, takeLast, takeWhile, scan, reduce, fromEvent, switchMap, mergeMap,concatMap, of, exhaustMap, forkJoin, timer, delay, startWith, combineLatest, zip } from 'rxjs';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
})
export class OperatorsComponent implements OnInit {

  ngOnInit(): void {
    //this.onSwitchMap();
    //this.onMergeMap();
    //this.onConcatMap();
    //this.onExhaustMap();
    //this.onForkJoin();
    //this.onCombineLatest();
    this.onZip();
  }

  public onSwitchMap(): void {
    fromEvent(document, 'click')
      .pipe(
        switchMap(() => {
          return interval(1000)
          .pipe(
            tap((value) => console.log('tap:', value)),
            take(5),
            reduce((acc, value) => acc + value, 0)
          )
        })
      )
      .subscribe({
        next: value => console.log('Next switch', value),
        complete: () => console.log('Completed!')
      },
    )
  } 

  public onMergeMap(): void {
    const letters = of('a', 'b', 'c');
    const result = letters
      .pipe(
        mergeMap(
          x => interval(1000)
          .pipe(
            map(i => x + i)
          )
        )
      );
 
    result.subscribe(x => console.log(x));
  }

  public onConcatMap(): void {
    const letters = of('a', 'b', 'c');
    const result = letters
      .pipe(
        concatMap(
          x => interval(1000)
          .pipe(
            map(i => x + i)
          )
        )
      );
 
    result.subscribe(x => console.log(x));
  }

  public onExhaustMap(): void {
    const letters = of('a', 'b', 'c');
    const result = letters
      .pipe(
        exhaustMap(
          x => interval(1000)
          .pipe(
            map(i => x + i)
          )
        )
      );
 
    result.subscribe(x => console.log(x));
  }

  public onForkJoin(): void {
    const observable = forkJoin({
      foo: of(1, 2, 3, 4),
      bar: Promise.resolve(8),
      baz: timer(4000)
    });
    observable.subscribe({
     next: value => console.log(value),
     complete: () => console.log('This is how it ends!'),
    });
  }

  public onCombineLatest(): void {
    const observables = [1, 5, 10].map(
      n => of(n).pipe(
        delay(n * 1000), // emit 0 and then emit n after n seconds
        startWith(0)
      )
    );
    const combined = combineLatest(observables);
    combined.subscribe(value => console.log(value));
  }

  public onZip(): void {
    const age$ = of(27, 25, 29);
    const name$ = of('Foo', 'Bar', 'Beer');
    const isDev$ = of(true, true, false);
 
    zip(age$, name$, isDev$).pipe(
      map(([age, name, isDev]) => ({ age, name, isDev }))
    )
    .subscribe(x => console.log(x));
  }
    

  //public stream$ = interval(1000)
    //.pipe(
      //tap((value) => console.log('tap:', value)),
      //take(5),
      //map((value) => value * 15),
      //filter((value) => value % 2 === 0),
      //take(15),
      //takeLast(5),
      //takeWhile((value) => value < 7),
      //scan((acc, value) => acc + value, 0),
      //reduce((acc, value) => acc + value, 0)
    //)
    //.subscribe({
      //next: value => console.log('Next', value),
      //complete: () => console.log('Completed!')
    //},
  //)

}
