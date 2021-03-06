import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@social/shared/models/posts.model';

@Component({
  selector: 'app-shared-wall',
  templateUrl: './shared-wall.component.html',
  styleUrls: ['./shared-wall.component.scss']
})
export class SharedWallComponent implements OnInit {

  constructor(private router: Router) { }

  public postsHistory: Post[]|null = null;

  ngOnInit(): void {
  }

}
