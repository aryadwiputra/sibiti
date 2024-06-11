import Button from '@/Components/Dashboard/Button';
import Card from '@/Components/Dashboard/Card';
import InputSelect from '@/Components/Dashboard/InputSelect';
import Pagination from '@/Components/Dashboard/Pagination';
import Search from '@/Components/Dashboard/Search';
import Table from '@/Components/Dashboard/Table'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { IconDatabaseOff, IconPencilCheck, IconUserBolt } from '@tabler/icons-react';
import React, { useState } from 'react'
export default function Index({ exams }) {

    // destruct permissions from props
    const { permissions } = usePage().props;

    const { data, setData, transform, post } = useForm({
        exam_id: '',
    });

    const [selectedExam, setSelectedExam] = useState(null)

    // Set gender
    const setSelectedExamHandler = (value) => {
        setSelectedExam(value)
        setData('exam_id', value.id)
    }

    const filterData = (e) => {
        e.preventDefault();
        router.get(route('reports.filter', data), {
            onSuccess: () => {
                setSelectedExam(null);
            }
        })
    }

    return (
        <>
            <Head title='Laporan Ujian' />
            <Card
                title={'Laporan Ujian'}
            >
                <div className='mb-5'>
                    <form onSubmit={filterData}>
                        <div className='mb-4 flex flex-col md:flex-row justify-between items-end gap-4'>
                            <div className='w-full md:w-1/2'>
                                <InputSelect
                                    label="Filter Berdasarkan Ujian"
                                    data={exams}
                                    placeholder="Cari ujian"
                                    selected={selectedExam}
                                    setSelected={setSelectedExamHandler}
                                    errors={null}
                                    multiple={false}
                                    searchable={true}
                                    displayKey='title'
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <Button
                                    type={'submit'}
                                    label={'Filter'}
                                    className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <Table.Card title={'Data Hak Akses'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th className='w-10'>No</Table.Th>
                                <Table.Th>Ujian</Table.Th>
                                <Table.Th>Sesi</Table.Th>
                                <Table.Th>Nama Siswa</Table.Th>
                                <Table.Th>Kelas</Table.Th>
                                <Table.Th>Pelajaran</Table.Th>
                                <Table.Th>Nilai</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {exams.data ?
                                exams.data.map((exam, i) => (
                                    <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                        <Table.Td className='text-center'>
                                            {++i + (exams.current_page - 1) * exams.per_page}
                                        </Table.Td>
                                        <Table.Td>
                                            {exam.title}
                                        </Table.Td>
                                        <Table.Td>
                                            {exam.session}
                                        </Table.Td>
                                        <Table.Td>
                                            {exam.student}
                                        </Table.Td>
                                        <Table.Td>
                                            {exam.class}
                                        </Table.Td>
                                        <Table.Td>
                                            {exam.lesson}
                                        </Table.Td>
                                        <Table.Td>
                                            {exam.score}
                                        </Table.Td>
                                    </tr>
                                )) :
                                <Table.Empty colSpan={7} message={
                                    <>
                                        <div className='flex justify-center items-center text-center mb-2'>
                                            <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                        </div>
                                        <span className='text-gray-500'>Data ujian</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
                                    </>
                                } />
                            }
                        </Table.Tbody>
                    </Table>
                </Table.Card>
            </Card>
        </>
    )
}
Index.layout = page => <DashboardLayout children={page} />
