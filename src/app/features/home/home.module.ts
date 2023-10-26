import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FruitCardComponent } from './components/fruit-card/fruit-card.component';
import { FruitDetailsComponent } from './components/fruit-details/fruit-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    HomeComponent,
    FruitCardComponent,
    FruitDetailsComponent,
    SearchBarComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, FormsModule],
})
export class HomeModule {}
