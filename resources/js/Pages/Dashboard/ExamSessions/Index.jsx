import Checkbox from '@/Components/Checkbox';
import Button from '@/Components/Dashboard/Button';
import Card from '@/Components/Dashboard/Card';
import Search from '@/Components/Dashboard/Search';
import Table from '@/Components/Dashboard/Table';
import Widget from '@/Components/Dashboard/Widget';
import Modal from '@/Components/Dashboard/Modal';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { IconBox, IconChartBar, IconCirclePlus, IconDatabaseOff, IconPackage, IconPencil, IconPencilCheck, IconPencilCog, IconTrash, IconUserShield, IconUsers, IconWallet } from '@tabler/icons-react';
import Input from '@/Components/Dashboard/Input';
import InputSelect from '@/Components/Dashboard/InputSelect';
import { useEffect, useState } from 'react';

export default function Index({ exam_sessions, exams }) {
    const { errors } = usePage().props;

    // define form helper inertia
    const { data, setData, transform, post } = useForm({
        id: '',
        exam_id: '',
        title: '',
        start_time: '',
        start_date: '',
        end_time: '',
        end_date: '',
        isUpdate: false,
        isOpen: false,
    });

    // gabungkan date dan time
    const formatDateTime = (date, time) => {
        return `${date} ${time}`
    }

    const formatExamOption = (exam) => {
        return `${exam.title} - ${exam.lesson.title} - ${exam.classroom.title}`;
    };

    // State for select inputs
    const [selectedExam, setSelectedExam] = useState(null)

    // Set gender
    const setSelectedExamHandler = (value) => {
        setSelectedExam(value)
        setData('exam_id', value.id)
    }


    // transform data before submit
    transform((data) => ({
        ...data,
        start_time: formatDateTime(data.start_date, data.start_time),
        end_time: formatDateTime(data.end_date, data.end_time),
        _method: data.isUpdate === true ? 'put' : 'post'
    }))

    // define function create new classrooms
    const saveExamSession = async (e) => {
        e.preventDefault();
        console.log(data)
        post(route('exam_sessions.store'), {
            onSuccess: () => {
                setData({
                    exam_id: '',
                    title: '',
                    start_time: '',
                    start_date: '',
                    end_time: '',
                    end_date: '',
                    isUpdate: false,
                    isOpen: false,
                })
                setSelectedExam(null);
            }
        });
    }

    // define function update role by id
    const updateExamSession = async (e) => {
        e.preventDefault();
        post(route('exam_sessions.update', data.id), {
            onSuccess: () => {
                setData({
                    id: '',
                    exam_id: '',
                    title: '',
                    start_time: '',
                    start_date: '',
                    end_time: '',
                    end_date: '',
                    isUpdate: false,
                    isOpen: false,
                });
                setSelectedExam(null);
            }
        })
    }
    return (
        <>
            <Head title='Sesi Ujian' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Button
                            type={'button'}
                            icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                            label={'Tambah Data Sesi Ujian'}
                            onClick={() => setData('isOpen', true)}
                            added={true}
                        />
                    </div>
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('exam_sessions.index')}
                            placeholder={'Cari data berdasarkan nama sesi ujian'}
                        />
                    </div>
                </div>
            </div>
            <Modal
                show={data.isOpen}
                onClose={() =>
                    setData({
                        isOpen: false,
                        id: '',
                        exam_id: '',
                        title: '',
                        start_time: '',
                        end_time: '',
                        isUpdate: false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Sesi Ujian' : 'Tambah Data Baru'}`}
                icon={<IconUserShield size={20} strokeWidth={1.5} />}
            >
                <form onSubmit={data.isUpdate === true ? updateExamSession : saveExamSession}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600">Nama</label>
                        <Input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            errors={errors.title}
                        />
                    </div>
                    <div className="mb-4">
                        <InputSelect
                            label="Ujian"
                            data={exams.map(exam => ({
                                ...exam,
                                displayName: formatExamOption(exam)
                            })) || []}
                            selected={selectedExam}
                            setSelected={setSelectedExamHandler}
                            placeholder="Pilih Ujian"
                            errors={errors.exam_id}
                            searchable={true}
                            multiple={false}
                            displayKey='displayName'
                        />
                    </div>
                    <div className="mb-4">
                        <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                            <div className='w-full md:w-1/2'>
                                <Input
                                    label={'Tanggal Mulai'}
                                    type="date"
                                    value={data.start_date || ''}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <Input
                                    label={'Tanggal Selesai'}
                                    type="date"
                                    value={data.end_date || ''}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-4 flex flex-col md:flex-row justify-between gap-4'>
                            <div className='w-full md:w-1/2'>
                                <Input
                                    label={'Waktu Mulai'}
                                    type="time"
                                    value={data.start_time || ''}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                    errors={errors.start_time}
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <Input
                                    label={'Waktu Selesai'}
                                    type="time"
                                    value={data.end_time || ''}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                    errors={errors.end_time}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        type={'submit'}
                        icon={<IconPencilCheck size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        added={true}
                        label={data.isUpdate ? 'Update' : 'Save'}
                    />
                </form>
            </Modal>
            <Table.Card title={'Data Sesi'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>Ujian</Table.Th>
                            <Table.Th>Sesi</Table.Th>
                            <Table.Th>Mulai</Table.Th>
                            <Table.Th>Selesai</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {exam_sessions.data.length ?
                            exam_sessions.data.map((exam_session, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (exam_sessions.current_page - 1) * exam_sessions.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <strong>{exam_session.exam.title}</strong>
                                        <ul className='mt-1'>
                                            <li>Pelajaran : {exam_session.exam.lesson.title}</li>
                                            <li>Kelas : {exam_session.exam.classroom.title}</li>
                                        </ul>
                                    </Table.Td>
                                    <Table.Td>{exam_session.title}</Table.Td>
                                    {/* <Table.Td>{exam_session.exam_session_students.length}</Table.Td> */}
                                    <Table.Td>{exam_session.start_time}</Table.Td>
                                    <Table.Td>{exam_session.end_time}</Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2 md:justify-center'>
                                            <Button
                                                type={'link'}
                                                // icon={<IconEye size={16} strokeWidth={1.5} />}
                                                className={'border bg-green-100 border-green-300 text-green-500 hover:bg-green-200 dark:bg-green-950 dark:border-green-800 dark:text-gray-300  dark:hover:bg-green-900'}
                                                href={route('exam_sessions.show', exam_session.id)}
                                                label={'Detail'}
                                            />
                                            <Button
                                                type={'modal'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                                                className={'border bg-orange-100 border-orange-300 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-gray-300  dark:hover:bg-orange-900'}
                                                onClick={() => {
                                                    const selectedExam = exams.find((exam) => exam.id === exam_session.exam_id);
                                                    setData({
                                                        id: exam_session.id,
                                                        exam_id: exam_session.exam_id,
                                                        title: exam_session.title,
                                                        start_time: exam_session.start_time.split(' ')[1] || '',
                                                        end_time: exam_session.end_time.split(' ')[1] || '',
                                                        start_date: exam_session.start_time.split(' ')[0] || '',
                                                        end_date: exam_session.end_time.split(' ')[0] || '',
                                                        isOpen: true,
                                                        isUpdate: true,
                                                    });
                                                    if (selectedExam) {
                                                        setSelectedExam({
                                                            id: selectedExam.id,
                                                            displayName: formatExamOption(selectedExam)
                                                        });
                                                    }
                                                }}
                                            />

                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('exam_sessions.destroy', exam_session.id)}
                                            />
                                        </div>
                                    </Table.Td>
                                </tr>
                            )) :

                            <Table.Empty colSpan={6} message={
                                <>
                                    <div className='flex justify-center items-center text-center mb-2'>
                                        <IconDatabaseOff size={24} strokeWidth={1.5} className='text-gray-500 dark:text-white' />
                                    </div>
                                    <span className='text-gray-500'>Data sesi ujian</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card >
        </>
    );
}

Index.layout = page => <DashboardLayout children={page} />
