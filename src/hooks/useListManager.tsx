import { useState, useCallback } from 'react';
import { useModal } from '../contexts/ModalContext';
import { useCreateList, useDeleteList, useUpdateList } from './useLists';
import { useFetchListData } from './useLists';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
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
    const deleteListMutation = useDeleteList(listId || 0);
    const { closeCreateList } = useModal();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
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

    const handleDeleteList = useCallback(() => {
        deleteListMutation.mutate(undefined,{
            onSuccess: () => {
                setEditListOpen(false);

                //After deletion - Redirecting to anoother list
                const cachedLists = queryClient.getQueryData<any[]>(['lists', userId]) || queryClient.getQueryData<any[]>(['lists']) || queryClient.getQueryData<any[]>(['userLists', userId]) || [];

                const next = (cachedLists || []).find(l => l.id !== listId) || cachedLists[0];

                if (next && next.id) {
                    // Ajusta la ruta según tu router; aquí uso /lists/:id/:userId como ejemplo
                    navigate(`/accounts/${userId}/lists/${next.id}`, { replace: true });
                }else{
                    // fallback si no hay listas: ir al home
                    navigate('/', { replace: true });
                }
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