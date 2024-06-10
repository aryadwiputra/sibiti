import React, { useState } from 'react'
import { Head, usePage, useForm } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { IconUsersPlus, IconPencilPlus, IconUserShield } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Button from '@/Components/Dashboard/Button'
import Checkbox from '@/Components/Dashboard/Checkbox'
import toast from 'react-hot-toast'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputSelect from '@/Components/Dashboard/InputSelect'

export default function Create({ exam }) {

    const { data, setData, post, errors } = useForm({
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        option_5: '',
        answer: '',
    });

    const correct_answer = [
        { id: '1', name: 'Pilihan A' },
        { id: '2', name: 'Pilihan B' },
        { id: '3', name: 'Pilihan C' },
        { id: '4', name: 'Pilihan D' },
        { id: '5', name: 'Pilihan E' },
    ]

    const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(null)

    const setSelectedCorrectAnswerHandler = (value) => {
        setSelectedCorrectAnswer(value)
        setData('answer', value.id)
    }

    const saveQuestion = async (e) => {
        e.preventDefault();
        post(route('exams.questions.store', exam.id), {
            onSuccess: () => {
                toast('Data berhasil disimpan', {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#1C1F29',
                        color: '#fff',
                    },
                })
            }
        });
    }

    return (
        <>
            <Head title={'Tambah Soal'} />
            <Card
                title={'Tambah Soal'}
                icon={<IconUsersPlus size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Simpan'}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'}
                    />
                }
                form={saveQuestion}
            >
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Soal</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.question}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData('question', data);
                            }}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Pilihan A</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.option_1}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData('option_1', data);
                            }}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Pilihan B</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.option_2}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData('option_2', data);
                            }}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Pilihan C</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.option_3}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData('option_3', data);
                            }}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Pilihan D</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.option_4}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData('option_4', data);
                            }}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Pilihan E</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.option_5}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData('option_5', data);
                            }}
                        />
                    </div>
                </div>
                <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                    <div className='w-full text-black'>
                        <label className='text-white mb-5'>Pilihan Benar</label>
                        <InputSelect
                            data={correct_answer}
                            selected={selectedCorrectAnswer}
                            setSelected={setSelectedCorrectAnswerHandler}
                            placeholder="Pilih Pilihan Benar"
                            errors={null}
                            multiple={false}
                            searchable={false}
                            displayKey='name'
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
