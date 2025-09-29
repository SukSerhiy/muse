import { FC, ReactNode } from 'react';

type ItemGridProps = {
  children: ReactNode | ReactNode[];
};

const ItemsGrid: FC<ItemGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {children}
    </div>
  );
};

export default ItemsGrid;
