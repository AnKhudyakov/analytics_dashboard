import { Icons } from '.';

export default {
  title: 'Shared/Icons',
};

export const AllIcons = () => (
  <div className={'flex flex-wrap gap-5'}>
    {Object.entries(Icons).map(([name, Icon]) => (
      <div key={name}>
        <div className="w-full text-center flex justify-center">
          <Icon width={20} height={20} className=''/>
        </div>
        <p>{name}</p>
      </div>
    ))}
  </div>
);
