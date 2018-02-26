import {Chapter} from './chapter';
import {Comment} from './comment';

export class Fanfiction {
  id: number;
  author: string;
  title: string;
  description: string;
  genre: string;
  creationDate: string;
  tags: Array<string>;
  imageURL: string;
  chapters: Array<Chapter>;
  comments: Array<Comment>;
}
