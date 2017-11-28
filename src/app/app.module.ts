import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CategoriesComponent } from './categories/categories.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { RegisterComponent } from './register/register.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { FooterComponent } from './footer/footer.component';





const appRoutes: Routes = [
  {path: 'userLogin', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'userLogin/register', component: RegisterComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: 'userLogin/instructions', component: InstructionsComponent},
  {path: 'userLogin/:id/home', component: UserHomeComponent},
  {path: 'userLogin/:id/allBlog', component: BlogComponent},
  {path: 'userLogin/:id/allBlog/:id', component: PostDetailComponent},
  {path: 'userLogin/:id/postBlog', component: PostBlogComponent},
  {path: 'userLogin/:id/favourite', component: FavouriteComponent},
  {path: 'userLogin/:id/categories', component: CategoriesComponent},
  {path: 'userLogin/:id/categories/:id', component: CategoryDetailsComponent},
  {path: 'userLogin/:id/myBlog', component: MyBlogsComponent},
  {path: '', component: HomeComponent}];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BlogComponent,
    PostDetailComponent,
    UserHomeComponent,
    CategoriesComponent,
    FavouriteComponent,
    PostBlogComponent,
    MyBlogsComponent,
    CategoryDetailsComponent,
    RegisterComponent,
    InstructionsComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
