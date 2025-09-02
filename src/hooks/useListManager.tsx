import { useState, useCallback } from 'react';
import { useModal } from '../contexts/ModalContext';
import { useCreateList, useUpdateList } from './useLists';
import { useFetchListData } from './useLists';
import type { List } from '../types';

type ListFormType = Omit<List, 'id' | 'tasks'>
type UseListManagerProps = {
    listId?: number;
    userId: number;
}

export function useListManager({ listId, userId }: UseListManagerProps){
    const [isEditListOpen, setEditListOpen] = useState(false);
    const [editFormList, setEditFormList] = useState<any>({});
    const [formList, setFormList] = useState<ListFormType>({
        title: '',
        color: '#000000',
        authorId: userId,
    });

    const listQuery = listId ? useFetchListData(listId) : null;

    const listData = listId ? listQuery?.data?.list : null;
    const createListMutation = useCreateList();
    const updateListMutation = useUpdateList(listId || 0);
    const { closeCreateList } = useModal();

    const toggleEditList = useCallback(() => setEditListOpen(v => !v), []);

    const openEditListWith = useCallback((listData: List) => {
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
        setEditFormList((prev) => ({
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
            }
        })
    }, [formList, userId]);

    const handleSubmitEditedList = useCallback((e: React.FormEvent) =>{
        e?.preventDefault?.();
        const submitData = {
            ...editFormList
        };
        
        updateListMutation.mutate(submitData, {
            onSuccess: () => {
                setEditListOpen(false);
            }
        })
    }, [editFormList, userId]);

    return {
        formList,
        editFormList,
        handleChangeList,
        handleChangeEditList,
        handleSubmitList,
        handleSubmitEditedList,
        toggleEditList,
        openEditListWith,
        isEditListOpen,
        listData
    };
}