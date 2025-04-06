import { Component, effect, inject, input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../interfaces/post';
import { NgClass} from '@angular/common';
import { PostService } from '../../../services/post.service';
@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent{
  submitted = false;
  private formBuilder = inject(FormBuilder);
  id=input.required<number>;
  edit=input.required<string>;
  postService=inject(PostService)
  

      postForm = this.formBuilder.nonNullable.group({
      userId: [1, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  

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
    this.postService._createPost(this.postForm.value as Post).subscribe(data=>{
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
