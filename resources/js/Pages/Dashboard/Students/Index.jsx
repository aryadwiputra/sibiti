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
import InputSelect from '@/Components/Dashboard/InputSelect';
import { useState } from 'react';

export default function Index({ students, classrooms }) {
    const { errors } = usePage().props;

    const gender = [
        { id: 'L', name: 'Laki-laki' },
        { id: 'P', name: 'Perempuan' },
    ]

    // define form helper inertia
    const { data, setData, transform, post } = useForm({
        id: '',
        name: '',
        nisn: '',
        gender: '',
        password: '',
        classroom_id: '',
        isUpdate: false,
        isOpen: false,
    });

    // define set selected value

    // State for select inputs
    const [selectedGender, setSelectedGender] = useState(null)
    const [selectedClassroom, setSelectedClassroom] = useState(null)

    // Set gender
    const setSelectedGenderHandler = (value) => {
        setSelectedGender(value)
        setData('gender', value.id)
    }

    // Set classroom
    const setSelectedClassroomHandler = (value) => {
        setSelectedClassroom(value)
        setData('classroom_id', value.id)
    }


    // transform data before submit
    transform((data) => ({
        ...data,
        _method: data.isUpdate === true ? 'put' : 'post'
    }))

    // define function create new classrooms
    const saveStudent = async (e) => {
        e.preventDefault();
        console.log(data)
        post(route('students.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    nisn: '',
                    gender: '',
                    password: '',
                    classroom_id: '',
                    isOpen: false,
                })
                setSelectedGender(null);
                setSelectedClassroom(null);
            }
        });
    }

    // define function update role by id
    const updateStudent = async (e) => {
        e.preventDefault();
        post(route('students.update', data.id), {
            onSuccess: () => {
                setData({
                    id: '',
                    name: '',
                    nisn: '',
                    gender: '',
                    password: '',
                    classroom_id: '',
                    isUpdate: false,
                    isOpen: false,
                });
                setSelectedGender(null);
                setSelectedClassroom(null);
            }
        })
    }
    return (
        <>
            <Head title='Pelajar' />
            <div className='mb-2'>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Button
                            type={'button'}
                            icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                            className={'border bg-white text-gray-700 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                            label={'Tambah Data Pelajar'}
                            onClick={() => setData('isOpen', true)}
                            added={true}
                        />
                    </div>
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('students.index')}
                            placeholder={'Cari data berdasarkan nama atau nisn'}
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
                        name: '',
                        nisn: '',
                        gender: '',
                        password: '',
                        classroom_id: '',
                        isUpdate: false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Pelajar' : 'Tambah Data Baru'}`}
                icon={<IconUserShield size={20} strokeWidth={1.5} />}
            >
                <form onSubmit={data.isUpdate === true ? updateStudent : saveStudent}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600">Nama</label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            errors={errors.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600">NISN</label>
                        <Input
                            type="text"
                            value={data.nisn}
                            onChange={(e) => setData('nisn', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            errors={errors.nisn}
                        />
                    </div>
                    <div className="mb-4">
                        <InputSelect
                            label="Jenis Kelamin"
                            data={gender}
                            selected={selectedGender}
                            setSelected={setSelectedGenderHandler}
                            placeholder="Pilih Jenis Kelamin"
                            errors={null}
                            multiple={false}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600">Password</label>
                        <Input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            errors={errors.password}
                        />
                    </div>
                    <div className="mb-4">
                        <InputSelect
                            label="Ruang Kelas"
                            data={classrooms}
                            selected={selectedClassroom}
                            setSelected={setSelectedClassroomHandler}
                            placeholder="Pilih Ruang Kelas"
                            errors={null}
                            multiple={false}
                            searchable={true}
                            displayKey='title'
                        />
                    </div>
                    <Button
                        type={'submit'}
                        icon={<IconPencilCheck size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200'}
                        added={true}
                        label={data.isUpdate ? 'Update' : 'Save'}
                    />
                    {/* <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {data.isUpdate ? 'Update' : 'Save'}
                    </button> */}
                </form>
            </Modal>
            <Table.Card title={'Data Pelajar'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>Kelas</Table.Th>
                            <Table.Th>NISN</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Jenis Kelamin</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {students.data.length ?
                            students.data.map((student, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (students.current_page - 1) * students.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {student.classroom.title}
                                    </Table.Td>
                                    <Table.Td>
                                        {student.nisn}
                                    </Table.Td>
                                    <Table.Td>
                                        {student.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {student.gender}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2 md:justify-center'>
                                            <Button
                                                type={'modal'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                                                className={'border bg-orange-100 border-orange-300 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-gray-300  dark:hover:bg-orange-900'}
                                                onClick={() => {
                                                    const selectedStudentGender = gender.find(g => g.id === student.gender);
                                                    const selectedStudentClassroom = classrooms.find(c => c.id === student.classroom_id);

                                                    setData({
                                                        id: student.id,
                                                        classroom_id: student.classroom_id,
                                                        nisn: student.nisn,
                                                        name: student.name,
                                                        gender: student.gender,
                                                        isUpdate: true,
                                                        isOpen: true,
                                                    });
                                                    setSelectedGender(selectedStudentGender);
                                                    setSelectedClassroom(selectedStudentClassroom);
                                                }}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('students.destroy', student.id)}
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
                                    <span className='text-gray-500'>Data pelajar</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
