import React from 'react'
import { Head, usePage, useForm } from '@inertiajs/react'
import Card from '@/Components/Dashboard/Card'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { IconUsersPlus, IconPencilPlus, IconUserShield } from '@tabler/icons-react'
import Input from '@/Components/Dashboard/Input'
import Button from '@/Components/Dashboard/Button'
import Checkbox from '@/Components/Dashboard/Checkbox'
import toast from 'react-hot-toast'
import Table from '@/Components/Dashboard/Table'
export default function Create(students) {
    // destruct props roles from use page
    const { roles } = usePage().props;

    const { data, setData, post, errors } = useForm({
        student_id: [],
        exam_id: students.exam.id
    });

    const saveStudents = async (e) => {
        e.preventDefault();
        post(route('exam_sessions.group.store', students.exam_session.id), {
            onSuccess: () => {
                toast.success('Berhasil menambahkan peserta')
            },
            onError: () => {
                toast.error('Gagal menambahkan peserta')
            }
        })
    }

    return (
        <>
            <Head title={'Tambah Peserta Ujian'} />
            <Card
                title={'Tambah Peserta Ujian'}
                icon={<IconUsersPlus size={20} strokeWidth={1.5} />}
                footer={
                    <Button
                        type={'submit'}
                        label={'Simpan'}
                        added={true}
                        icon={<IconPencilPlus size={20} strokeWidth={1.5} />}
                        className={'border bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-900'}
                    />
                }
                form={saveStudents}
            >
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>
                                <Checkbox
                                    checked={data.student_id.length === students.students.length}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData('student_id', students.students.map((student) => student.id));
                                        } else {
                                            setData('student_id', []);
                                        }
                                    }}
                                />
                            </Table.Th>
                            <Table.Th>NISN</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Jenis Kelamin</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {students.students.map((student, index) => (
                            <tr key={index}>
                                <Table.Td className={'w-10'}>
                                    <Checkbox
                                        checked={data.student_id.includes(student.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData('student_id', [...data.student_id, student.id]);
                                            } else {
                                                setData('student_id', data.student_id.filter((id) => id !== student.id));
                                            }
                                        }}
                                    />
                                </Table.Td>
                                <Table.Td>{student.nisn}</Table.Td>
                                <Table.Td>{student.name}</Table.Td>
                                <Table.Td>{student.gender}</Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </>
    )
}

Create.layout = page => <DashboardLayout children={page} />
