import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HierarchyDataComponent } from './component/hierarchy-data/hierarchy-data.component';
import { TabsComponent } from './component/tabs/tabs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'HierarchyData', component: HierarchyDataComponent },
  { path: 'TabsData', component: TabsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
