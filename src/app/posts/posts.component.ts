import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/shared/post.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts$ = this.http
  .get<IPost[]>('/api/posts');

constructor(private http: HttpClient) { }

ngOnInit(): void { }

}
