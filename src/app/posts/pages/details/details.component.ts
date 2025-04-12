import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../../services/post.service';
import { JsonPipe, NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { HttpResourceRef } from '@angular/common/http';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
 
  user!:User;
  id=input.required<number>();
  postService=inject(PostService)
  userService=inject(UserService)
 
postRs=this.postService.getPostRs(this.id)

ngOnInit(): void {

this.postService.getPost(this.id()).subscribe(data=>{
  this.userService.getUser(data.userId).subscribe(data=>{
    this.user=data
  })
})
  

}
}
