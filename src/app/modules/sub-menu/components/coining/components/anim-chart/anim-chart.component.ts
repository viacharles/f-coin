import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { interval, BehaviorSubject, Observable } from 'rxjs';
import { CoiningService } from '../../coining.service';

@Component({
  selector: 'app-anim-chart',
  templateUrl: './anim-chart.component.html',
  styleUrls: ['./anim-chart.component.scss']
})
export class AnimChartComponent implements OnInit {

  @Input() currentIncomePerSec = new BehaviorSubject<number>(0);
  @Input() dot1: ElementRef|null = null;
  @Input() dot2: ElementRef|null = null;
  @Input() dot3: ElementRef|null = null;
  @Input() dot4: ElementRef|null = null;
  @Input() chart: ElementRef|null = null;

  constructor(private render: Renderer2, private $feature: CoiningService) { }

  // === 紀錄節點的數值 ===
  public val1 = 0;
  public val2 = 0;
  public val3 = 0;
  public val4 = 0;
  // ======

  private income$: Observable<number> = this.currentIncomePerSec.asObservable();

  ngOnInit(): void {
    let intervalAnim$ = interval(10000)
  }



}
