import { Icons } from '.';

export default {
  title: 'Shared/Icons',
};

export const AllIcons = () => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {Object.entries(Icons).map(([name, Icon]) => (
      <div key={name}>
        <div className="w-full text-center flex justify-center">
          <Icon width={20} height={20} />
        </div>
        <p>{name}</p>
      </div>
    ))}
  </div>
);
