import Checkbox from '@/Components/Checkbox';
import Button from '@/Components/Dashboard/Button';
import Card from '@/Components/Dashboard/Card';
import Search from '@/Components/Dashboard/Search';
import Table from '@/Components/Dashboard/Table';
import Widget from '@/Components/Dashboard/Widget';
import Modal from '@/Components/Dashboard/Modal';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { IconBox, IconChartBar, IconCirclePlus, IconDatabaseOff, IconPackage, IconPencilCheck, IconPencilCog, IconTrash, IconUserShield, IconUsers, IconWallet } from '@tabler/icons-react';
import Input from '@/Components/Dashboard/Input';

export default function Index({ classrooms }) {


    const { errors } = usePage().props;

    // define form helper inertia
    const { data, setData, transform, post } = useForm({
        id: '',
        title: '',
        isUpdate: false,
        isOpen: false,
    });
    // transform data before submit
    transform((data) => ({
        ...data,
        _method: data.isUpdate === true ? 'put' : 'post'
    }))

    // define function create new classrooms
    const saveClassroom = async (e) => {
        e.preventDefault();

        post(route('classrooms.store'), {
            onSuccess: () => {
                setData({
                    title: '',
                    isOpen: false,
                })
            }
        });
    }

    // define function update role by id
    const updateClassroom = async (e) => {
        e.preventDefault();
        post(route('classrooms.update', data.id), {
            onSuccess: () => {
                setData({
                    id: '',
                    title: '',
                    isUpdate: false,
                    isOpen: false,
                });
            }
        })
    }
    return (
        <>
            <Head title='Kelas' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Button
                            type={'button'}
                            icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                            label={'Tambah Data Kelas'}
                            onClick={() => setData('isOpen', true)}
                            added={true}
                        />
                    </div>
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('classrooms.index')}
                            placeholder={'Cari data berdasarkan nama kelas'}
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
                        title: '',
                        isUpdate: false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Kelas' : 'Tambah Data Baru'}`}
                icon={<IconUserShield size={20} strokeWidth={1.5} />}
            >
                <form onSubmit={data.isUpdate === true ? updateClassroom : saveClassroom}>
                    <div className='mb-4'>
                        <Input
                            label={'Nama kelas'}
                            type={'text'}
                            placeholder={'Masukan nama akses kelas'}
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            errors={errors.title}
                        />
                    </div>
                    <Button
                        type={'submit'}
                        icon={<IconPencilCheck size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        added={true}
                        label={'Simpan'}
                    />
                </form>
            </Modal>
            <Table.Card title={'Data Kelas'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {classrooms.data.length ?
                            classrooms.data.map((classroom, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (classrooms.current_page - 1) * classrooms.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {classroom.title}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2 md:justify-center'>
                                            <Button
                                                type={'modal'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                                                className={'border bg-orange-100 border-orange-300 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-gray-300  dark:hover:bg-orange-900'}
                                                onClick={() =>
                                                    setData({
                                                        id: classroom.id,
                                                        title: classroom.title,
                                                        isUpdate: true,
                                                        isOpen: !data.isOpen,
                                                    })
                                                }
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('classrooms.destroy', classroom.id)}
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
                                    <span className='text-gray-500'>Data pengguna</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
                                </>
                            } />
                        }
                    </Table.Tbody>
                </Table>
            </Table.Card>
        </>
    );
}

Index.layout = page => <DashboardLayout children={page} />