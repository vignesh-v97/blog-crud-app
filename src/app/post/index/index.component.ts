import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAll().subscribe(
      (post: Post[]) => {
        this.posts = post;
        console.log(this.posts, 'POSTS IN INDEX')
      }
    )
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(
      (res) => 
      {
        this.posts = this.posts.filter(item => item.id !== id);
        console.log(res, 'DELETE ON INDEX PAGE');
      }
    )
  }

}
