import { NgClass } from '@angular/common';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  
  submitted = false;
  private formBuilder = inject(FormBuilder);
  id=input.required<number>();
  postService=inject(PostService)
  post=signal<Post>({
    'userId':0,
    'title':'',
     'body':''
  })
  ngOnInit(): void {
    this.postService.getPost(this.id()).subscribe(data=>{
      this.postForm.patchValue(data)
      this.post.set(data)
    })
  }
      postForm = this.formBuilder.nonNullable.group({
      userId: [1, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  
    // si no queremos utilizar ngOnInit podemos crear un efecto

/*  miid=effect(()=>{
this.postService.getPost(this.id()).subscribe(data=>{
  this.postForm.patchValue(data)
  this.post.set(data)
})
 }) */

  get f() {
    return this.postForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    
    console.log('Form submitted successfully', this.postForm.value);
    // Aquí puedes enviar los datos a un API
    this.postService.updatePost(this.postForm.value as Post,this.id()).subscribe(data=>{
      console.log(data)
    })
    
    // Resetear el formulario y marcar como no enviado
    this.postForm.reset({userId: 1});
    this.submitted = false;
  }

  resetForm(): void {
    this.submitted = false;
    this.postForm.reset({userId: 1});
  }
}

