/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  game: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    });
  }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.game = this.route.snapshot.data['special'];
    }
    console.log(this.game);
  }
}
