/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable radix */
import { Component, Injectable, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.page.html',
  styleUrls: ['./newgame.page.scss'],
})
export class NewgamePage implements OnInit {
  players: any;
  gameNo: any = 0;
  date: any;
  gamefinish: boolean;
  point1: number;
  point2: number;
  point3: number;
  point4: number;
  score1: string;
  score2: string;
  score3: string;
  score4: string;
  total1: number;
  total2: number;
  total3: number;
  total4: number;
  round: number;
  winner;
  page: any;
  constructor(
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    public alertController: AlertController,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const uri = this.router.url.split('/');
    this.page = uri[1];
    this.date = new Date().toLocaleDateString();
    this.gamefinish = false;
    this.players = [];
    this.round = 1;
    this.score1 = '00';
    this.score2 = '00';
    this.score3 = '00';
    this.score4 = '00';
    this.total1 = 0;
    this.total2 = 0;
    this.total3 = 0;
    this.total4 = 0;
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.page === 'newgame') {
        if (this.gamefinish != true) {
          this.presentAlertConfirm();
        } else {
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to end <strong>game</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            if (this.players.length == 0) {
              this.showPrompt();
            }
          },
        },
        {
          text: 'Okay',
          handler: async () => {
            await alert.dismiss();
            this.router.navigateByUrl('/home', { replaceUrl: true });
          },
        },
      ],
    });

    await alert.present();
  }

  async showPrompt() {
    const alert = await this.alertController.create({
      header: `Enter player's name`,
      inputs: [
        {
          name: 'player1',
          placeholder: 'player 1',
        },
        {
          name: 'player2',
          placeholder: 'player 2',
        },
        {
          name: 'player3',
          placeholder: 'player 3',
        },
        {
          name: 'player4',
          placeholder: 'player 4',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentAlertConfirm();
          },
        },
        {
          text: `let's Go`,
          handler: (data) => {
            // eslint-disable-next-line eqeqeq
            if (
              data.player1 != '' &&
              data.player2 != '' &&
              data.player3 != '' &&
              data.player4 != ''
            ) {
              typeof data.player1 === 'undefined' || !data.player1
                ? null
                : this.players.push(data.player1);
              typeof data.player2 === 'undefined' || !data.player2
                ? null
                : this.players.push(data.player2);
              typeof data.player3 === 'undefined' || !data.player3
                ? null
                : this.players.push(data.player3);
              typeof data.player4 === 'undefined' || !data.player4
                ? null
                : this.players.push(data.player4);

              console.log(this.players);
              return true;
            } else {
              return false;
            }
          },
        },
      ],
      backdropDismiss: false,
    });
    alert.present();
  }

  async ngOnInit() {
    await this.storage.create();
    this.showPrompt();
    if (this.route.snapshot.data['special']) {
      console.log('taking routes');
      this.gameNo = this.route.snapshot.data['special'];
    }
  }

  addScore() {
    if (
      this.point1 !== null &&
      this.point2 !== null &&
      this.point3 !== null &&
      this.point4 !== null &&
      this.point1 !== undefined &&
      this.point2 !== undefined &&
      this.point3 !== undefined &&
      this.point4 !== undefined
    ) {
      const zero = 0;
      if (this.round === 1) {
        this.score1 = '';
        this.score2 = '';
        this.score3 = '';
        this.score4 = '';
        this.total1 += this.point1;
        this.score1 =
          this.point1 < 10
            ? '0' + this.point1.toString()
            : this.point1.toString();
        this.point1 = null;
        this.total2 += this.point2;
        this.score2 =
          this.point2 < 10
            ? '0' + this.point2.toString()
            : this.point2.toString();
        this.point2 = null;
        this.total3 += this.point3;
        this.score3 =
          this.point3 < 10
            ? '0' + this.point3.toString()
            : this.point3.toString();
        this.point3 = null;
        this.total4 += this.point4;
        this.score4 =
          this.point4 < 10
            ? '0' + this.point4.toString()
            : this.point4.toString();
        this.point4 = null;
        this.round++;
      } else {
        this.total1 += this.point1;
        if (this.point1 < 10) {
          this.score1 = this.score1 + ' + ' + '0' + this.point1.toString();
        } else {
          this.score1 = this.score1 + ' + ' + this.point1.toString();
        }
        this.point1 = null;
        this.total2 += this.point2;
        if (this.point2 < 10) {
          this.score2 = this.score2 + ' + ' + '0' + this.point2.toString();
        } else {
          this.score2 = this.score2 + ' + ' + this.point2.toString();
        }
        this.point2 = null;
        this.total3 += this.point3;
        if (this.point3 < 10) {
          this.score3 = this.score3 + ' + ' + '0' + this.point3.toString();
        } else {
          this.score3 = this.score3 + ' + ' + this.point3.toString();
        }
        this.point3 = null;
        this.total4 += this.point4;
        if (this.point4 < 10) {
          this.score4 = this.score4 + ' + ' + '0' + this.point4.toString();
        } else {
          this.score4 = this.score4 + ' + ' + this.point4.toString();
        }
        this.point4 = null;
        this.round++;
      }
      if (this.round === 8) {
        this.gameEnd();
      }
    }
  }
  async gameEnd() {
    const a = this.total1;
    const b = this.total2;
    const c = this.total3;
    const d = this.total4;
    const obj = { a, b, c, d };
    const min = Math.min(a, b, c, d);
    const key = Object.keys(obj).find((k) => obj[k] == min);
    if (key == 'a') {
      this.winner = this.players[0];
    } else if (key == 'b') {
      this.winner = this.players[1];
    } else if (key == 'c') {
      this.winner = this.players[2];
    } else {
      this.winner = this.players[3];
    }
    this.gamefinish = true;
    const game = {
      gameNO: this.gameNo + 1,
      date: this.date,
      players: this.players,
      score1: this.score1,
      score2: this.score2,
      score3: this.score3,
      score4: this.score4,
      total1: this.total1,
      total2: this.total2,
      total3: this.total3,
      total4: this.total4,
      winner: this.winner,
    };
    const gameArray = [];
    gameArray.push(game);
    this.storage
      .get('mikGameScore')
      .then(async (data) => {
        if (data == null) {
          await this.storage.set('mikGameScore', gameArray);
        } else {
          data.push(game);
          await this.storage.set('mikGameScore', data);
        }
      })
      .catch((err) => {});
  }

  move(txt1, txt2) {
    const val = txt1.value;
    if (val.length == 2) {
      txt2.focus();
    }
  }
}
