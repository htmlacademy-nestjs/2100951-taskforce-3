import { Entity } from '@project/util/util-types';
import { Tag } from '@project/shared/app-types';

export class TaskTagEntity implements Entity<TaskTagEntity>, Tag {
  public tagId: number;
  public name: string;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.name = entity.name;
    this.tagId = entity.tagId;
  }

  public toObject(): TaskTagEntity {
    return { ...this };
  }
}
