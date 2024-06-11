import Card from '@/Components/Dashboard/Card';
import Table from '@/Components/Dashboard/Table';
import Widget from '@/Components/Dashboard/Widget';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { IconBox, IconChartBar, IconDoorEnter, IconPackage, IconReport, IconUsers, IconWallet } from '@tabler/icons-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function Dashboard({ exams, students, users, classrooms }) {



    return (
        <>
            <Head title='Dashboard' />
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <Widget
                    title={'Pelajar'}
                    subtitle={'Total Pelajar'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconUsers size={'20'} strokeWidth={'1.5'} />}
                    total={students}
                />
                <Widget
                    title={'Kelas'}
                    subtitle={'Total Kelas'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconDoorEnter size={'20'} strokeWidth={'1.5'} />}
                    total={classrooms}
                />
                <Widget
                    title={'Ujian'}
                    subtitle={'Total Ujian'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconReport size={'20'} strokeWidth={'1.5'} />}
                    total={exams}
                />
                <Widget
                    title={'Users'}
                    subtitle={'Total Users'}
                    color={'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}
                    icon={<IconUsers size={'20'} strokeWidth={'1.5'} />}
                    total={users}
                />
            </div>
            {/* <div className='grid grid-cols-4 mt-5 gap-4 items-start'>
                <div className='col-span-4 md:col-span-2'>
                    <Table.Card
                        title={'Data Produk Dengan Stok Dibawah Limit'}
                        icon={<IconPackage size={20} strokeWidth={1.5} />}
                    >
                        <Table>
                            <Table.Thead>
                                <tr>
                                    <Table.Th className='w-10'>No</Table.Th>
                                    <Table.Th>Nama Produk</Table.Th>
                                    <Table.Th className={'text-center'}>Stok</Table.Th>
                                </tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {products.map((product, i) => (
                                    <tr className='hover:bg-gray-100 dark:hover:bg-gray-900' key={i}>
                                        <Table.Td className='text-center'>
                                            {++i}
                                        </Table.Td>
                                        <Table.Td>
                                            {product.name}
                                        </Table.Td>
                                        <Table.Td className={'text-center'}>
                                            <span className='rounded-full px-2.5 py-1 text-xs tracking-tight font-medium transition-colors focus:outline-none gap-1 capitalize border border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'>
                                                {product.stock
                                                }</span>
                                        </Table.Td>
                                    </tr>
                                ))
                                }
                            </Table.Tbody>
                        </Table>
                    </Table.Card>
                </div>
                <div className='col-span-4 md:col-span-2'>
                    <div className={`p-4 rounded-t-lg border bg-white dark:bg-gray-950 dark:border-gray-900`}>
                        <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 dark:text-gray-200'>
                            Grafik Penjualan Produk
                        </div>
                    </div>
                    <div className='p-4 rounded-b-lg border border-t-0 bg-white dark:bg-gray-950 dark:border-gray-900'>
                        <Bar className='min-w-full' data={data} />
                    </div>
                </div>
            </div> */}
        </>
    );
}

Dashboard.layout = page => <DashboardLayout children={page} />
