import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {PlayerComponent} from "../player/player.component"
import {MoviesComponent} from "../movies/movies.component"
import {DownloadsComponent} from "../movies/downloads/downloads.component"
import {LoginComponent} from "../login/login.component"

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "player", component: PlayerComponent},
  {path: "movies", component: MoviesComponent},
  {path: "downloads", component: DownloadsComponent},
  {path: "", redirectTo: "movies", pathMatch: "full"},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
