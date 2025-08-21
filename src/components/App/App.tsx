import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import NoteForm from '../NoteForm/NoteForm.tsx';
import Modal from '../Modal/Modal.tsx';
import NoteList from '../NoteList/NoteList.tsx';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService.ts';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearchChange={handleSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <button className={css.button} onClick={openModal}>
            Create Note+
          </button>
        </header>
        {isPending && <div className={css.loading}>Loading...</div>}
        {isSuccess && data && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
        {isError && <ErrorMessage />}
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
