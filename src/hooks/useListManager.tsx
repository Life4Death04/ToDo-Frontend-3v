import { useState, useCallback } from 'react';
import { useModal } from '../contexts/ModalContext';
import { useCreateList, useDeleteList, useUpdateList } from './useLists';
import { useFetchListData } from './useLists';
import { useNavigate } from 'react-router';
import type { List } from '../types';

type ListFormType = Omit<List, 'id' | 'tasks'>
type UseListManagerProps = {
    listId?: number;
    userId: number;
}

/**
 * useListManager
 * Hook that encapsulates list-related UI state and mutations.
 *
 * Responsibilities:
 * - manage create/edit list modal state and form values
 * - call create/update/delete list mutations and handle side-effects
 * - expose `listData` fetched for a specific `listId` when provided
 *
 * @param {UseListManagerProps} params - configuration object
 * @param {number} [params.listId] - optional list id to fetch (reads list data)
 * @param {number} params.userId - current user id used as author for creates
 * @returns object containing form state, handlers, modal toggles and fetched listData
 */
export function useListManager({ listId, userId }: UseListManagerProps){
    const [isEditListOpen, setEditListOpen] = useState(false);
    const [editFormList, setEditFormList] = useState<Partial<List>>({});
    const [formList, setFormList] = useState<ListFormType>({
        title: '',
        color: '#000000',
        authorId: userId,
    });

    const listQuery = listId ? useFetchListData(listId) : null;

    const listData = listId ? listQuery?.data?.list : null;
    const createListMutation = useCreateList();
    const updateListMutation = useUpdateList(listId || 0);
    const deleteListMutation = useDeleteList(listId || 0);
    const { closeCreateList } = useModal();
    const navigate = useNavigate();
    const toggleEditList = useCallback(() => setEditListOpen(v => !v), []);

    const openEditListWith = useCallback((listData: Partial<List>) => {
        setEditFormList(listData);
        setEditListOpen(true);
    }, []);

    const handleChangeList = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const { name, value } = e.target;
        setFormList((prev) => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleChangeEditList = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormList((prev: Partial<List>) => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmitList = useCallback((e: React.FormEvent) =>{
        e.preventDefault();
        const submitData = {
            ...formList,
            authorId: userId,
        };

        createListMutation.mutate(submitData, {
            onSuccess: () => {
                closeCreateList();
                setFormList({title: '', color: '#000000', authorId: userId});
            }
        })
    }, [formList, userId]);

    const handleSubmitEditedList = useCallback((e: React.FormEvent) =>{
        e?.preventDefault?.();
        const submitData = {
            ...editFormList
        };
        
    updateListMutation.mutate(submitData as List, {
            onSuccess: () => {
                setEditListOpen(false);
            }
        })
    }, [editFormList, userId]);

    const handleDeleteList = useCallback(() => {
        deleteListMutation.mutate(undefined,{
            onSuccess: () => {
                setEditListOpen(false);
                navigate(`/accounts/${userId}`, {replace: true})
            }
        });
    }, [deleteListMutation]);

    return {
        formList,
        editFormList,
        handleChangeList,
        handleChangeEditList,
        handleSubmitList,
        handleSubmitEditedList,
        handleDeleteList,
        toggleEditList,
        openEditListWith,
        isEditListOpen,
        listData,
    };
}