import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any;
  carrousel: any;

  constructor() {
    this.products = [];
    this.carrousel = [
      {
        src: 'https://i.ytimg.com/vi/o-CnLaIp_sw/maxresdefault.jpg',
        name: 'Primera',
      },
      {
        src:
          'https://www.instyle.es/medio/2019/12/16/tendencias-de-moda_e19a2b54_1200x630.jpg',
        name: 'Primera',
      },
      {
        src:
          'https://carfra.com.ar/wp-content/uploads/2020/05/juvenil-moda-2020.jpg',
        name: 'Primera',
      },
    ];
  }

  ngOnInit(): void {}
}
