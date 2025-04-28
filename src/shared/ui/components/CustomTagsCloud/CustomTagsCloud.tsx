import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTags } from 'shared/lib/helpers';
import { Card } from 'shared/ui/components/Card';
import { colors, StyledTagCloud, TagItem } from './CustomTagsCloud.styles';

interface CustomTagsCloudProps {
  tags: string[];
}

export const CustomTagsCloud: FC<CustomTagsCloudProps> = ({ tags }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <StyledTagCloud
        minSize={12}
        maxSize={16}
        tags={formatTags(tags)}
        onClick={(tag) =>
          navigate(`/videos?search=${encodeURIComponent(tag.value)}`)
        }
        renderer={(tag, size) => {
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <TagItem
              key={tag.value}
              className={color}
              style={{ fontSize: `${size}px` }}
            >
              #{tag.value}
            </TagItem>
          );
        }}
      />
    </Card>
  );
};
