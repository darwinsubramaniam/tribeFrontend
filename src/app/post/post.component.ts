import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPost } from 'src/shared/post.interface';
import { Observable } from 'rxjs';

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

  isCommentsVisible = false;

  listOfComments = []

  commentParam: HttpParams = new HttpParams().set('postId', this.postId);
  comment$: Observable<any>;


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

      this.commentParam = new HttpParams().set('postId', this.postId);
      this.comment$ = this.http.get('/api/comments', { params: this.commentParam });
      this.comment$.subscribe(comments => {
        console.log(comments)
        this.listOfComments = comments;
      });
    });


  }

  viewComments() {
    if (this.isCommentsVisible) {

      this.isCommentsVisible = false;

    } else {
      this.isCommentsVisible = true;
    }
  }

}
