import tw from 'tailwind-styled-components';

export const CardsContainer = tw.div`
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6
`;

export const Card = tw.div`
  bg-secordary-dark p-4 rounded-xl shadow-md flex flex-col items-center border border-secordary-500
`;

export const CardTitle = tw.h3`
  text-lg font-semibold text-gray-700 mb-2
`;

export const CardValue = tw.p`
  text-2xl font-bold text-blue-600
`;
