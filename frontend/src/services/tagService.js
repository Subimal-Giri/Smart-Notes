import api, { unwrap } from "./api.js";

export const getAllTags = () => unwrap(api.get('/tags'));

export const createTag = (payload) => unwrap(api.post('/tags', payload));

export const updateTag = (id, payload) => unwrap(api.put(`/tags/${id}`, payload));

export const deleteTag = (id) => unwrap(api.delete(`/tags/${id}`));
