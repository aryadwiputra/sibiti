import Checkbox from '@/Components/Dashboard/Checkbox';
import Button from '@/Components/Dashboard/Button';
import Card from '@/Components/Dashboard/Card';
import Search from '@/Components/Dashboard/Search';
import Table from '@/Components/Dashboard/Table';
import Widget from '@/Components/Dashboard/Widget';
import Modal from '@/Components/Dashboard/Modal';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { IconBox, IconChartBar, IconCirclePlus, IconDatabaseOff, IconEye, IconPackage, IconPencilCheck, IconPencilCog, IconTrash, IconUserShield, IconUsers, IconWallet } from '@tabler/icons-react';
import Input from '@/Components/Dashboard/Input';
import InputSelect from '@/Components/Dashboard/InputSelect';
import { useState } from 'react';
import Textarea from '@/Components/Dashboard/TextArea';

export default function Index({ lessons, classrooms, exams }) {
    const { errors } = usePage().props;

    const is_selected = [
        { id: 'Y', name: 'Ya' },
        { id: 'N', name: 'Tidak' },
    ]

    // define form helper inertia
    const { data, setData, transform, post } = useForm({
        id: '',
        classroom_id: '',
        lesson_id: '',
        title: '',
        duration: '',
        description: '',
        random_question: '',
        random_answer: '',
        show_answer: '',
        isUpdate: false,
        isOpen: false,
    });

    // define set selected value

    // State for select inputs
    const [selectedLesson, setSelectedLesson] = useState(null)
    const [selectedClassroom, setSelectedClassroom] = useState(null)
    const [selectedRandomQuestion, setSelectedRandomQuestion] = useState(null)
    const [selectedRandomAnswer, setSelectedRandomAnswer] = useState(null)
    const [selectedShowAnswer, setSelectedShowAnswer] = useState(null)

    // Set gender
    const setSelectedLessonHandler = (value) => {
        setSelectedLesson(value)
        setData('lesson_id', value.id)
    }

    // Set classroom
    const setSelectedClassroomHandler = (value) => {
        setSelectedClassroom(value)
        setData('classroom_id', value.id)
    }

    // Set random question
    const setSelectedRandomQuestionHandler = (value) => {
        setSelectedRandomQuestion(value)
        setData('random_question', value.id)
    }

    // Set random answer
    const setSelectedRandomAnswerHandler = (value) => {
        setSelectedRandomAnswer(value)
        setData('random_answer', value.id)
    }

    // Set show answer
    const setSelectedShowAnswerHandler = (value) => {
        setSelectedShowAnswer(value)
        setData('show_answer', value.id)
    }


    // transform data before submit
    transform((data) => ({
        ...data,
        _method: data.isUpdate === true ? 'put' : 'post'
    }))

    // define function create new classrooms
    const saveExam = async (e) => {
        e.preventDefault();
        console.log(data)
        post(route('exams.store'), {
            onSuccess: () => {
                setData({
                    classroom_id: '',
                    lesson_id: '',
                    title: '',
                    duration: '',
                    description: '',
                    random_question: '',
                    random_answer: '',
                    show_answer: '',
                    isUpdate: false,
                    isOpen: false,
                })
                setSelectedLesson(null);
                setSelectedClassroom(null);
            }
        });
    }

    // define function update role by id
    const updateExam = async (e) => {
        e.preventDefault();
        post(route('exams.update', data.id), {
            onSuccess: () => {
                setData({
                    id: '',
                    classroom_id: '',
                    lesson_id: '',
                    title: '',
                    duration: '',
                    description: '',
                    random_question: '',
                    random_answer: '',
                    show_answer: '',
                    isUpdate: false,
                    isOpen: false,
                });
                setSelectedLesson(null);
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
                            label={'Tambah Data Ujian'}
                            onClick={() => setData('isOpen', true)}
                            added={true}
                        />
                    </div>
                    <div className='w-full md:w-4/12'>
                        <Search
                            url={route('exams.index')}
                            placeholder={'Cari data berdasarkan nama'}
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
                        classroom_id: '',
                        lesson_id: '',
                        title: '',
                        duration: '',
                        description: '',
                        random_question: '',
                        random_answer: '',
                        show_answer: '',
                        isUpdate: false,
                    })
                }
                title={`${data.isUpdate === true ? 'Ubah Data Ujain' : 'Tambah Data Baru'}`}
                icon={<IconUserShield size={20} strokeWidth={1.5} />}
            >
                <form onSubmit={data.isUpdate === true ? updateExam : saveExam}>
                    <div className="mb-4">
                        <Input
                            label={'Nama Ujian'}
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            errors={errors.title}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            label={'Durasi'}
                            type="number"
                            value={data.duration}
                            onChange={(e) => setData('duration', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            errors={errors.duration}
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            label={'Deskripsi'}
                            type="text"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                            errors={errors.description}
                        />
                    </div>
                    <div className="mb-4">
                        <InputSelect
                            label="Mata Pelajaran"
                            data={lessons}
                            selected={selectedLesson}
                            setSelected={setSelectedLessonHandler}
                            placeholder="Pilih Mata Pelajaran"
                            errors={null}
                            multiple={false}
                            searchable
                            displayKey='title'
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
                    <div className="mb-4">
                        <InputSelect
                            label="Acak Soal"
                            data={is_selected}
                            selected={selectedRandomQuestion}
                            setSelected={setSelectedRandomQuestionHandler}
                            placeholder="Soal Akan Diacak?"
                            errors={null}
                            multiple={false}
                            searchable={false}
                            displayKey='name'
                        />
                    </div>
                    <div className="mb-4">
                        <InputSelect
                            label="Acak Jawaban"
                            data={is_selected}
                            selected={selectedRandomAnswer}
                            setSelected={setSelectedRandomAnswerHandler}
                            placeholder="Jawaban Akan Diacak?"
                            errors={null}
                            multiple={false}
                            searchable={false}
                            displayKey='name'
                        />
                    </div>
                    <div className="mb-4">
                        <InputSelect
                            label="Tampilkan Jawaban"
                            data={is_selected}
                            selected={selectedShowAnswer}
                            setSelected={setSelectedShowAnswerHandler}
                            placeholder="Tampilkan Jawaban?"
                            errors={null}
                            multiple={false}
                            searchable={false}
                            displayKey='name'
                        />
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
            <Table.Card title={'Data Pelajar'}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th className={'w-10'}>No</Table.Th>
                            <Table.Th>Kelas</Table.Th>
                            <Table.Th>Mata Pelajaran</Table.Th>
                            <Table.Th>Ujian</Table.Th>
                            <Table.Th>Durasi</Table.Th>
                            <Table.Th>Jumlah Soal</Table.Th>
                            <Table.Th></Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {exams.data.length ?
                            exams.data.map((exam, i) => (
                                <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                    <Table.Td className='text-center'>
                                        {++i + (exams.current_page - 1) * exams.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {exam.classroom.title}
                                    </Table.Td>
                                    <Table.Td>
                                        {exam.lesson.title}
                                    </Table.Td>
                                    <Table.Td>
                                        {exam.title}
                                    </Table.Td>
                                    <Table.Td>
                                        {exam.duration}
                                    </Table.Td>
                                    <Table.Td>
                                        {exam.questions.length}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className='flex gap-2 md:justify-center'>
                                            <Button
                                                type={'link'}
                                                // icon={<IconEye size={16} strokeWidth={1.5} />}
                                                className={'border bg-green-100 border-green-300 text-green-500 hover:bg-green-200 dark:bg-green-950 dark:border-green-800 dark:text-gray-300  dark:hover:bg-green-900'}
                                                href={route('exams.show', exam.id)}
                                                label={'Detail'}
                                            />
                                            <Button
                                                type={'modal'}
                                                icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                                                className={'border bg-orange-100 border-orange-300 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:border-orange-800 dark:text-gray-300  dark:hover:bg-orange-900'}
                                                onClick={() => {
                                                    const selectedStudentLesson = lessons.find(g => g.id === exam.lesson_id);
                                                    const selectedStudentClassroom = classrooms.find(c => c.id === exam.classroom_id);
                                                    const selectedRandomQuestion = is_selected.find(r => r.id === exam.random_question);
                                                    const selectedRandomAnswer = is_selected.find(r => r.id === exam.random_answer);
                                                    const selectedShowAnswer = is_selected.find(r => r.id === exam.show_answer);

                                                    setData({
                                                        id: exam.id,
                                                        classroom_id: exam.classroom_id,
                                                        lesson_id: exam.lesson_id,
                                                        title: exam.title,
                                                        duration: exam.duration,
                                                        description: exam.description,
                                                        random_question: exam.random_question,
                                                        random_answer: exam.random_answer,
                                                        show_answer: exam.show_answer,
                                                        isUpdate: true,
                                                        isOpen: true,
                                                    });
                                                    setSelectedLesson(selectedStudentLesson);
                                                    setSelectedClassroom(selectedStudentClassroom);
                                                    setSelectedRandomQuestion(selectedRandomQuestion);
                                                    setSelectedRandomAnswer(selectedRandomAnswer);
                                                    setSelectedShowAnswer(selectedShowAnswer);
                                                }}
                                            />
                                            <Button
                                                type={'delete'}
                                                icon={<IconTrash size={16} strokeWidth={1.5} />}
                                                className={'border bg-rose-100 border-rose-300 text-rose-500 hover:bg-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-gray-300  dark:hover:bg-rose-900'}
                                                url={route('exams.destroy', exam.id)}
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
                                    <span className='text-gray-500'>Data ujian</span> <span className='text-rose-500 underline underline-offset-2'>tidak ditemukan.</span>
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
