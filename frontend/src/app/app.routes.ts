import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactlistComponent } from './contact/contactlist/contactlist.component';
import { ContactaddComponent } from './contact/contactadd/contactadd.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ContacteditComponent } from './contact/contactedit/contacteditcomponent';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactlistComponent},
  {path: 'contact/add', component: ContactaddComponent},
  {path: 'contact/edit/:id', component: ContacteditComponent},
  {path: 'chat', component: ChatComponent},
  { path: '**', component: NotfoundComponent },

];