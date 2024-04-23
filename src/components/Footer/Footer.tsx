import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-[#FEAF38] from-48% to-[#FFCE1A] to-100%">
            <div className="container-fluid text-center text-md-left py-3">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2 mt-3 md:mt-0 mb-3 md:mb-0 flex flex-col lg:flex-row justify-content-center gap-10">
                        <a
                            href="#"
                            className="text-decoration-none text-gray-50 hover:text-gray-600"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-decoration-none text-gray-50 hover:text-gray-600"
                        >
                            Terms of Use
                        </a>
                        <a
                            href="#"
                            className="text-decoration-none text-gray-50 hover:text-gray-600"
                        >
                            Sales and Refunds
                        </a>
                        <a
                            href="#"
                            className="text-decoration-none text-gray-50 hover:text-gray-600"
                        >
                            Legal
                        </a>
                    </div>
                    <div className="flex justify-content-center align-items-center opacity-75">
                        2024 Made with <span>❤</span> by Dinh
                    </div>
                </div>
            </div>
        </footer>
    );
};
