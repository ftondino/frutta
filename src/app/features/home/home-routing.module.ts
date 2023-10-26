import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FruitCardComponent } from './components/fruit-card/fruit-card.component';
import { FruitDetailsComponent } from './components/fruit-details/fruit-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: FruitCardComponent },
      {
        path: 'fruit-details/:id',
        component: FruitDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
