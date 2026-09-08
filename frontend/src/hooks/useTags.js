import { useEffect, useCallback } from "react";
import { getAllTags, createTag as apiCreate, updateTag as apiUpdate, deleteTag as apiDelete } from "../services/tagService";
import { useTagStore } from "../store/tagStore";
import { toast } from "sonner";

export function useTags() {
    const { tags, setTags, addTag, updateTagInList, removeTag } = useTagStore();

    const fetchTags = useCallback(async () => {
        try {
            const res = await getAllTags();
            setTags(res.data);
        }
        catch {
            toast.error('Could not load tags');
        }
    }, [setTags]);

    const createTag = async (payload) => {
        try {
            const res = await apiCreate(payload);
            addTag(res.data);
            toast.success('Tag created');
            return res.data;
        }
        catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create tag');
            return null;
        }
    };

    const editTag = async (id, payload) => {
        try {
            const res = await apiUpdate(id, payload);
            updateTagInList(id, res.data);
            toast.success('Tag updated');
            return res.data;
        }
        catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update tag');
            return null;
        }
    };

    const deleteTag = async (id) => {
        try {
            await apiDelete(id);
            removeTag(id);
            toast.success('Tag deleted');
        }
        catch {
            toast.error('Failed to delete tag');
        }
    };

    useEffect(() => { fetchTags(); }, [fetchTags]);

    return { tags, fetchTags, createTag, editTag, deleteTag };
}

