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

export default function Show({ exam_session }) {
    const { errors } = usePage().props;

    console.log(exam_session)

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
                            href={route('exam_sessions.index')}
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
                <Table.Card title={'Sesi Ujian'}>
                    <Table>
                        <Table.Tbody>
                            <tr>
                                <Table.Td>Sesi</Table.Td>
                                <Table.Td>{exam_session.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Ujian</Table.Td>
                                <Table.Td>{exam_session.exam.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Mata Pelajaran</Table.Td>
                                <Table.Td>{exam_session.exam.lesson.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Kelas</Table.Td>
                                <Table.Td>{exam_session.exam.classroom.title}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Mulai</Table.Td>
                                <Table.Td>{exam_session.start_time}</Table.Td>
                            </tr>
                            <tr>
                                <Table.Td>Selesai</Table.Td>
                                <Table.Td>{exam_session.end_time}</Table.Td>
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
                            label={'Tambah Peserta'}
                            href={route('exam_sessions.group.create', [exam_session.id])}
                            added={true}
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={'Peserta Ujian'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>NISN</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Jenis Kelamin</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {exam_session.exam_groups.data.length ?
                            exam_session.exam_groups.data.map((group, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (exam_session.exam_groups.current_page - 1) * exam_session.exam_groups.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {group.student.nisn}
                                    </Table.Td>
                                    <Table.Td>
                                        {group.student.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {group.student.gender}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2 md:justify-center'>
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('exam_sessions.group.destroy', [exam_session.id, group.id])}
                                            />
                                            {/* <Button
                                                type={'link'}
                                                icon={<IconUserShield size={16} strokeWidth={1.5} />}
                                                className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                                            href={route('exam_sessions.group.show', [group.id])}
                                            /> */}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))
                            :
                            <tr>
                                <Table.Td colSpan={5} className='text-center'>
                                    Tidak ada data
                                </Table.Td>
                            </tr>
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    );
}

Show.layout = page => <DashboardLayout children={page} />
