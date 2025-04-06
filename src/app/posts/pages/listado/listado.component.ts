import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/post';
import { PostService } from '../../../services/post.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado',
  imports: [RouterLink,NgIf, NgFor,FormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error: string | null = null;
  Math = Math;
  // Propiedades para paginación
  currentPage = 1;
  pageSize = 10;
  totalPosts = 0;
  
  // Propiedad para búsqueda
  searchTerm = ' ';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    
    this.postService.getPosts(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.posts = response.filter((data)=>data.title.includes(this.searchTerm.trim()));
        
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los posts: ' + (err.message || 'Error desconocido');
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }

  onSearch(): void {
    this.currentPage = 1; // Reiniciar a la primera página
    this.loadPosts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  deletePost(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== id);
          alert('Post eliminado con éxito');
        },
        error: (err) => {
          alert('Error al eliminar el post: ' + (err.message || 'Error desconocido'));
        }
      });
    }
  }
}
