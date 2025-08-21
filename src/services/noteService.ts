import axios from 'axios';
import type { CreateNote, Note } from '../types/note.ts';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<FetchNotesResponse> {
  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: { page, search, perPage: 12 },
  });
  return data;
}

export async function createNote(newNote: CreateNote): Promise<Note> {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(id: number): Promise<Note> {
  const { data } = await instance.delete<Note>(`/notes${id}`);
  return data;
}
