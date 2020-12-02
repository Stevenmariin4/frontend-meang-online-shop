import { SharedModule } from '@Shared/shared.module';
import { MaterialModule } from './material/material/material.module';
import { CoreModule } from '@Service/core.module';
import { PublicModule } from './@Public/pages/public.module';
import { AdminModule } from './@Admin/pages/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBpGcg-thzmtPomgT9_zluqAtUimbK__Ls',
      authDomain: 'es-moda.firebaseapp.com',
      databaseURL: 'https://es-moda.firebaseio.com',
      projectId: 'es-moda',
      storageBucket: 'es-moda.appspot.com',
      messagingSenderId: '800080730225',
      appId: '1:800080730225:web:422ac8901aea1b40f0a3d0',
      measurementId: 'G-J84629Z2ZG',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
