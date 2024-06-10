import Button from '@/Components/Dashboard/Button';
import Search from '@/Components/Dashboard/Search';
import Table from '@/Components/Dashboard/Table';
import Modal from '@/Components/Dashboard/Modal';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { IconChevronLeft, IconChevronsLeft, IconCirclePlus, IconDatabaseOff, IconPencilCheck, IconPencilCog, IconTrash, IconUserShield } from '@tabler/icons-react';
import Input from '@/Components/Dashboard/Input';
import InputSelect from '@/Components/Dashboard/InputSelect';
import Textarea from '@/Components/Dashboard/TextArea';

export default function Show({ exam }) {
    const { errors } = usePage().props;

    console.log(exam)

    return (
        <>
            <Head title='Ujian' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Button
                            type={'link'}
                            icon={<IconChevronsLeft size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                            href={route('exams.index')}
                        />
                    </div>
                    {/* <div className='w-full md:w-4/12'>
                        <Search
                            url={route('exams.index')}
                            placeholder={'Cari data berdasarkan nama'}
                        />
                    </div> */}
                </div>
            </div>
            <div className="mb-5">
                <Table.Card title={'Data Ujian'}>
                    <Table>
                        <Table.Tbody>
                            <tr>
                                <Table.Td>Ujian</Table.Td>
                                <Table.Td>{exam.classroom.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Mata Pelajaran</Table.Td>
                                <Table.Td>{exam.lesson.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Ujian</Table.Td>
                                <Table.Td>{exam.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Durasi</Table.Td>
                                <Table.Td>{exam.duration}</Table.Td>
                            </tr>
                        </Table.Tbody>
                    </Table>
                </Table.Card>
            </div>

            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Button
                            type={'link'}
                            icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                            label={'Tambah Soal'}
                            href={route('exams.questions.create', [exam.id])}
                            added={true}
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={'Soal-soal Ujian'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>Soal</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {exam.questions.data.length ?
                            exam.questions.data.map((question, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (exam.questions.current_page - 1) * exam.questions.per_page}
                                    </Table.Td>
                                    <Table.Td>{question.question}</Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2'>
                                            <Button
                                                type={'edit'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                                                className={'border bg-orange-100 border-orange-300 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-gray-300  dark:hover:bg-orange-900'}
                                                href={route('exams.questions.edit', [exam.id, question.id])}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('exams.questions.destroy', [exam.id, question.id])}
                                            />
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))
                            :
                            <tr>
                                <Table.Td colSpan={3} className={'text-center'}>Tidak ada data</Table.Td>
                            </tr>
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    );
}

Show.layout = page => <DashboardLayout children={page} />
