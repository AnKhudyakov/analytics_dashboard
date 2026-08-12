import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'shared/ui/Card';

import { TAG_COLORS, TagItem, TagList } from './TagsCloud.styles';

export interface TagsCloudProps {
  tags: readonly string[];
  buildHref: (tag: string) => string;
}

const colorOf = (tag: string) => {
  let hash = 0;
  for (let index = 0; index < tag.length; index += 1) {
    hash = (hash * 31 + tag.charCodeAt(index)) % 1_000_003;
  }
  return TAG_COLORS[hash % TAG_COLORS.length];
};

export const TagsCloud: FC<TagsCloudProps> = ({ tags, buildHref }) => (
  <Card>
    <TagList>
      {tags.map((tag) => (
        <TagItem key={tag} className={colorOf(tag)}>
          <Link to={buildHref(tag)}>#{tag}</Link>
        </TagItem>
      ))}
    </TagList>
  </Card>
);
