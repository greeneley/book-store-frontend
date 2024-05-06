import React from 'react';

export const Login: React.FC = () => {
    return (
        <div className="half">
            <div className="contents">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-12">
                            <div className="form-block mx-auto">
                                <div className="text-center mb-5">
                                    <h3>Đăng nhập</h3>
                                </div>
                                <form action="#" method="post">
                                    <div className="form-group first">
                                        <label htmlFor="username">
                                            Email
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            required={true}
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            id="username"
                                        />
                                    </div>
                                    <div className="form-group last mb-3 mt-3">
                                        <label htmlFor="password">
                                            Mật khẩu
                                            <span className="required">*</span>
                                        </label>
                                        <input
                                            required={true}
                                            type="password"
                                            className="form-control"
                                            placeholder="Mật khẩu"
                                            id="password"
                                        />
                                    </div>

                                    <div className="d-sm-flex mb-3 align-items-center">
                                        <span className="mr-auto">
                                            <a href="#" className="forgot-pass">
                                                Quên mật khẩu
                                            </a>
                                        </span>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Log In"
                                        className="btn btn-block btn-primary w-100"
                                    />
                                </form>

                                <div className="text-sm text-center mt-[1.6rem]">
                                    Chưa có tài khoản?{' '}
                                    <a
                                        className="text-sm text-[#7747ff]"
                                        href="#"
                                    >
                                        Đăng ký miễn phí!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
