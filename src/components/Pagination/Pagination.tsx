import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel='...'
      nextLabel='>'
      onPageChange={({ selected }: { selected: number }) =>
        onChange(selected + 1)
      }
      pageRangeDisplayed={5}
      forcePage={page - 1}
      pageCount={totalPages}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
}
