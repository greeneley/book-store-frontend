import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="pt-4">
            <div className="container-fluid text-center text-md-left py-5">
                <div className="row">
                    <div className="col-md-7 mt-md-0 mt-3 d-flex justify-content-center gap-10">
                        <a href="#" className="text-decoration-none">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-decoration-none">
                            Terms of Use
                        </a>
                        <a href="#" className="text-decoration-none">
                            Sales and Refunds
                        </a>
                        <a href="#" className="text-decoration-none">
                            Legal{' '}
                        </a>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-5 mb-md-0 mb-3 footer-copyright text-center opacity-75">
                        2024 Made with <span>❤</span> by Dinh
                    </div>
                </div>
            </div>
        </footer>
    );
};
