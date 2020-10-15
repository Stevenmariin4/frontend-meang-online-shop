import { Component, OnInit } from '@angular/core';
import {
  Ipromotions,
  IResponseDataPromotions,
} from '@Service/interfaces/promotions.interface';
import { PromotionsService } from '@Service/services/promotions/promotions.service';

@Component({
  selector: 'app-carousel-p',
  templateUrl: './carousel-p.component.html',
  styleUrls: ['./carousel-p.component.scss'],
})
export class CarouselPComponent implements OnInit {
  carrousel: Partial<Ipromotions>[];
  constructor(private promotionsService: PromotionsService) {
    this.carrousel = [];
  }

  ngOnInit(): void {
    this.getPromotionsFilter();
  }

  getPromotionsFilter() {
    const filter = {
      filter: {
        is_valid: 1,
      },
      limit: 10,
    };
    this.promotionsService
      .getPromotionByFilter(filter)
      .subscribe((data: IResponseDataPromotions) => {
        data.body.rows.forEach((element) => {
          this.carrousel.push({
            pro_id: element.pro_id,
            pro_name: element.pro_name,
            pro_image: element.pro_image,
          });
        });
      });
  }
}
