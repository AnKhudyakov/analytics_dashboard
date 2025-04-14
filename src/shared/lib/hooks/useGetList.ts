// import { useGetChannelsQuery, useSearchChannelsQuery } from 'entities/channel';
// import { ColumnChannel } from 'entities/channel/model/types';
// import { useState } from 'react';
// import { Filter } from 'shared/api/types';
// import { useDebounce } from 'shared/lib/hooks/useDebounce';

// export const useGetList = (resource:string) => {
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState<keyof typeof ColumnChannel>('name');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [filters, setFilters] = useState<Filter[]>([]);

//   const debouncedSearch = useDebounce(search, 1000);

//   const {
//     data: searchData,
//     isLoading: isSearching,
//     error: searchError,
//   } = useSearchChannelsQuery(
//     {
//       search: debouncedSearch,
//       page,
//       limit: rowsPerPage,
//       sortBy,
//       sortOrder,
//       filters,
//     },
//     {
//       skip: debouncedSearch.length < 1,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   const {
//     data: statsData,
//     isLoading: isLoadingStats,
//     error,
//   } = useGetChannelsQuery(
//     { page, limit: rowsPerPage, sortBy, sortOrder, filters },
//     {
//       skip: search.length > 1,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   const filteredData = search ? searchData : statsData;

//   return {
//     statsData: filteredData,
//     isLoading: isSearching || isLoadingStats,
//     error: error || searchError,
//     search,
//     setSearch,
//     page,
//     setPage,
//     rowsPerPage,
//     setRowsPerPage,
//     sortBy,
//     sortOrder,
//     setSortBy,
//     setSortOrder,
//     filters,
//     setFilters,
//   };
// };
