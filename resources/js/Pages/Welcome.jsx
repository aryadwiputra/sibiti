import React from 'react';

export default function Welcome() {
    return (
        <div className='min-h-screen flex items-center justify-center py-auto'>
            <div id="hero-section"
                className="max-w-[1200px] mx-auto w-full flex flex-col gap-10 pb-[50px] bg-[url('assets/background/Hero-Banner.png')] bg-center bg-no-repeat bg-cover rounded-[32px] overflow-hidden">
                <nav className="flex justify-between items-center pt-6 px-[50px]">
                    <a href="">
                        {/* <img src="assets/logo/logo.svg" alt="logo" /> */}
                        <h3 className='text-white text-xl md:text-4xl font-normal'>SibitiApps</h3>
                    </a>
                    <ul className="flex items-center gap-[30px] text-white">
                        <li>
                            <a href="{{ route('front.index') }}" className="font-semibold">Beranda</a>
                        </li>
                        <li>
                            <a href="{{ route('front.pricing') }}" className="font-semibold">Harga</a>
                        </li>
                        <li>
                            <a href="#" className="font-semibold">Keunggulan</a>
                        </li>
                        <li>
                            <a href="#" className="font-semibold">Tentang</a>
                        </li>
                    </ul>
                    {/* @auth
                    <div className="flex gap-[10px] items-center">
                        <div className="flex flex-col items-end justify-center">
                            <p className="font-semibold text-white">Hi, {{ Auth::user()->name }}</p>
                        @if (Auth::user()->hasActiveSubscription())
                            <p className="p-[2px_10px] rounded-full bg-[#FF6129] font-semibold text-xs text-white text-center">
                                PRO
                            </p>
                            @endif
                        </div>
                        <div className="w-[56px] h-[56px] overflow-hidden rounded-full flex shrink-0">
                            <a href="{{ route('dashboard') }}">
                                <img src="{{ Storage::url(Auth::user()->avatar) }}" className="object-cover w-full h-full"
                                    alt="photo">
                            </a>
                        </div>
                    </div>
                    @endauth
                    @guest
                    <div className="flex gap-[10px] items-center">
                        <a href="{{ route('register') }}"
                            className="text-white font-semibold rounded-[30px] p-[16px_32px] ring-1 ring-white transition-all duration-300 hover:ring-2 hover:ring-[#FF6129]">Sign
                            Up</a>
                        <a href="{{ route('login') }}"
                            className="text-white font-semibold rounded-[30px] p-[16px_32px] bg-[#FF6129] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF612980]">Sign
                            In</a>
                    </div>
                    @endguest */}
                </nav>
                <div className="flex flex-col items-center gap-[30px]">
                    <div className="w-fit flex items-center gap-3 p-2 pr-6 rounded-full bg-[#FFFFFF1F] border border-[#3477FF24]">
                        <div className="w-[100px] h-[48px] flex shrink-0">
                            <img src="assets/icon/avatar-group.png" className="object-contain" alt="icon" />
                        </div>
                        <p className="text-sm font-semibold text-white">Join 3 million users</p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="font-semibold text-[80px] leading-[82px] text-center text-white">
                            Aplikasi Ujian Online
                        </h1>
                        <p className="text-center text-xl leading-[36px] text-[#F5F8FA]">
                            Aplikasi ujian <i>online</i> berbasis webiste yang memudahkan <br /> para pelajar dan guru dalam melaksanakan ujian <br />serta mengurangi penggunaan kertas yang berlebih.
                        </p>
                    </div>
                    <div className="flex gap-6 w-fit">
                        <a href=""
                            className="text-white font-semibold rounded-[30px] p-[16px_32px] bg-[#FF6129] transition-all duration-300 hover:shadow-[0_10px_20px_0_#FF612980]">Explore
                            Courses</a>
                        <a href=""
                            className="text-white font-semibold rounded-[30px] p-[16px_32px] ring-1 ring-white transition-all duration-300 hover:ring-2 hover:ring-[#FF6129]">Career
                            Guidance</a>
                    </div>
                </div>
                <div className="flex gap-[70px] items-center justify-center">
                    <div>
                        <img src="assets/icon/logo-55.svg" alt="icon" />
                    </div>
                    <div>
                        <img src="assets/icon/logo-54.svg" alt="icon" />
                    </div>
                    <div>
                        <img src="assets/icon/logo-52.svg" alt="icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}
