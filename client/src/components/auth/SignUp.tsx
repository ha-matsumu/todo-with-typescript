/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { SignUpContext } from '../../store/contexts/SignUpContext';
import './SignUp.css';

interface InputData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { signUpUser } = useContext(SignUpContext);
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrros] = useState({
    name: '',
    email: '',
    password: '',
  });

  // メールアドレス用の正規表現
  const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  // パスワード用の正規表現
  const passwordRegex = new RegExp(
    /^(?=[A-Z\d]{0,99}[a-z])(?=[a-z\d]{0,99}[A-Z])(?=[a-zA-Z]{0,99}\d)[a-zA-Z\d]{8,100}$/
  );

  // 新規登録処理
  const signUpHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const inputData: InputData = {
      name,
      email,
      password,
    };

    // バリデーションエラーがある場合は、処理終了
    if (validate(inputData)) return;

    try {
      await signUpUser(inputData);
      // TODO: 後で、ページ遷移処理追加
    } catch (error) {
      throw new Error(error);
    }
  };

  // TODO:後でany型修正
  // バリデーションチェック
  const validate = (inputData: InputData): boolean => {
    const valiedaedErrors = { ...errors };
    let valid = false;

    (Object.keys(inputData) as (keyof InputData)[]).forEach(key => {
      const value = inputData[key];
      switch (key) {
        case 'name':
          if (value.length <= 0) {
            valiedaedErrors.name = '名前は必須です。';
            valid = true;
          } else {
            valiedaedErrors.name = '';
            valid = false;
          }
          break;
        case 'email':
          if (value.length === 0) {
            valiedaedErrors.email = 'メールアドレスは必須です。';
            valid = true;
          } else if (!emailRegex.test(value)) {
            valiedaedErrors.email = 'メールアドレスを入力してください。';
            valid = true;
          } else {
            valiedaedErrors.email = '';
            valid = false;
          }
          break;
        case 'password':
          if (!passwordRegex.test(value)) {
            valiedaedErrors.password = '半角英大文字小文字、数字を含む8文字以上で入力してください。';
            valid = true;
          } else {
            valiedaedErrors.password = '';
            valid = false;
          }
          break;
        default:
          break;
      }
    });
    setErrros(valiedaedErrors);
    return valid;
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>アカウントを新規作成</h2>
        <form onSubmit={signUpHandler} noValidate>
          <div className="userName">
            <label htmlFor="userName">
              名前
              <span>*</span>
            </label>
            <input
              type="text"
              className={errors.name ? 'error' : undefined}
              placeholder="例 : 山田太郎"
              name="userName"
              onChange={e => setUserName(e.target.value)}
              required
            />
            <span className="error-message">{errors.name}</span>
          </div>
          <div className="email">
            <label htmlFor="email">
              メールアドレス
              <span>*</span>
            </label>
            <input
              type="email"
              className={errors.email ? 'error' : undefined}
              placeholder="例 : tyamada@todo.com"
              name="email"
              onChange={e => setEmail(e.target.value)}
            />
            <span className="error-message">{errors.email}</span>
          </div>
          <div className="password">
            <label htmlFor="password">
              パスワード
              <span>*</span>
            </label>
            <input
              type="password"
              className={errors.password ? 'error' : undefined}
              placeholder="例 : ********"
              name="password"
              onChange={e => setPassword(e.target.value)}
            />
            <span className="error-message">{errors.password}</span>
          </div>
          <div className="createAccount">
            <input type="submit" value="アカウントを作成" />
            <small>
              <a href="/users/login">またはアカウントにサインイン</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
