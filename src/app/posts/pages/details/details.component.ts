import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../../services/post.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [RouterLink,NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  id=input.required<number>();
  postService=inject(PostService)
  post=signal<Post>({
    'userId':0,
    'title':'',
     'body':''
  })
  ngOnInit(): void {
    this.postService.getPost(this.id()).subscribe(data=>{
     this.post.set(data)
    })
  }
}
