import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categories, novelByGenre, Novel } from 'src/app/Model/novel';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  currentStyle: string = "display: none;";
  currentSpan: string = "button button-green js-call-filters-wrapper";

  changeClass() {
    if (this.currentSpan === "button button-green js-call-filters-wrapper") {
      this.currentStyle = "display: block;";

    } else {
      this.currentStyle = "display: none;";
    }
  }

  closeSpan: string = "js-off-filters-wrapper button button-red";

  buttonClose() {
    if (this.closeSpan === "js-off-filters-wrapper button button-red") {
      this.currentStyle = "display: none;";

    } else {
      this.currentStyle = "display: block;";
    }
  }

  categories: Categories[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);

  }

  novels: Novel[] = [];
  novel: Novel[] = [];

  constructor(private categoryService: NovelDataService, private activatedRoute: ActivatedRoute, private route: Router) {

    // const genre = this.activatedRoute.snapshot.paramMap.get('genre')!;
    // this.categoryService.getNovelByCategories(genre).subscribe(novels => this.novels = novels);

  //   let foodsObservalbe:Observable<Novel[]>;
  //   activatedRoute.params.subscribe((params) => {
  //     if(params)
  //     foodsObservalbe = this.categoryService.getNovelByCategories(params.tag)
  //     else
  //     foodsObservalbe = this.categoryService.getNovels();

  //     foodsObservalbe.subscribe((serverFoods) => {
  //       this.novel = serverFoods;
  //     })
  // });


}

  onCategorySelect() {
    const genre = this.activatedRoute.snapshot.paramMap.get('genre');
    if (genre) {
      // this.route.navigate(['/category/'+ genre]);
      this.categoryService.getNovelByCategories(genre).subscribe(novels => this.novels = novels);
      console.log(this.route.navigate(['/category/'+ genre]));
    }
    else {
      this.categoryService.getNovels().subscribe(novels => this.novels = novels);
    }
    console.log(genre);
  }

}
