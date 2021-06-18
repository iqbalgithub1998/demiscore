import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController, Platform, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  games: any;
  totalGames: any;
  page: any;
  isDark: boolean;
  constructor(private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    public dataService: DataService,
    public loadingController: LoadingController,
    private platform: Platform,
    private alertController: AlertController,
    ) {
      const uri = this.router.url.split('/');
      this.page = uri[1];

      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (this.page === 'home') {
          this.presentAlertConfirm();
        }
      });

    }


    async ngOnInit() {
      await this.storage.create();
    }
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
      this.loadData(loading);
    }

    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Are you sure you want to end <strong>game</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Okay',
            handler: async () => {
              App.exitApp();
            },
          },
        ],
      });
      await alert.present();
    }

  addgame() {
    this.dataService.setData(50, this.totalGames);
    this.router.navigateByUrl('/newgame/50', { replaceUrl: true });
  }
  ionViewDidEnter() {
    this.presentLoading();
  }

  async loadData(loading){
    this.isDark = await this.storage.get('isDark');
    this.storage.get('mikGameScore').then((data)=>{
      if(data == null){
        this.totalGames = 0;
        this.presentToast('No Game Found');
      }else{
        this.totalGames = data.length;
        this.games = data;
      }
      loading.dismiss();
    }).catch((err)=>{
      console.log(err);
    });
  }

  async presentToast(mass) {
    const toast = await this.toastController.create({
      message:mass ,
      duration: 2000
    });
    toast.present();
  }
  details(game){
    console.log(game);
    this.dataService.setData(50, game);
    if (game.gameFinish == true) {
      this.router.navigateByUrl(`/details/50`, { replaceUrl: true });
    } else {
      this.router.navigateByUrl(`/newgame/50`, { replaceUrl: true });
    }
  }

  async toggleTheme(event){
    if(event.detail.checked){
      this.isDark = true;
      document.body.setAttribute('color-theme','dark');
    }else{
      this.isDark = false;
      document.body.setAttribute('color-theme','light');
    }
    await this.storage.set('isDark',this.isDark);
  }
}
