import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  postService=inject(PostService)
  post=this.postService._getPosts().value;
}
