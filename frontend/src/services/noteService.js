import api, { unwrap } from "./api.js";

export const getAllNotes = () => unwrap(api.get('/notes'));

export const getArchived = () => unwrap(api.get('/notes/archived'));

export const getTrashed = () => unwrap(api.get('/notes/trash'));

export const searchNotes = (query) => unwrap(api.get('/notes/search', { params: { query } }));


export const getNoteById = (id) => unwrap(api.get(`/notes/${id}`));

export const createNote = (payload) => unwrap(api.post('/notes', payload));

export const updateNote = (id, payload) => unwrap(api.put(`/notes/${id}`, payload));

export const deleteNote = (id) => unwrap(api.delete(`/notes/${id}`));


export const trashNote = (id) => unwrap(api.patch(`/notes/${id}/trash`));

export const restoreNote = (id) => unwrap(api.patch(`/notes/${id}/restore`));

export const togglePin = (id) => unwrap(api.patch(`/notes/${id}/pin`));

export const toggleArchive = (id) => unwrap(api.patch(`/notes/${id}/archive`));

export const syncNoteTags = (id, tagIds) => unwrap(api.patch(`/notes/${id}/tags`, { tags: tagIds }));
