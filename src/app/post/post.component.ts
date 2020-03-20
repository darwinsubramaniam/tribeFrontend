import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IPost } from 'src/shared/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postId: string;

  title: string;
  body: string;
  userId: number;

  constructor(public activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
   this.activatedRoute.paramMap.pipe(
      map( ()  => window.history.state)
    ).subscribe(state => {
      this.postId = state.postId;

      this.http.get<IPost>(`/api/posts/${this.postId}`)
        .subscribe(data => {
        this.title = data.title;
        this.body = data.body;
        this.userId = data.userId;
      });
    });


  }

}
