import { Icons } from '.';

export default {
  title: 'Shared/Icons',
};

export const AllIcons = () => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {Object.entries(Icons).map(([name, Icon]) => (
      <div key={name} style={{ textAlign: 'center' }}>
        <Icon width={16} height={15} />
        <p>{name}</p>
      </div>
    ))}
  </div>
);
