/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import validator from 'validator';
import { SignUpContext } from '../../../store/contexts/SignUpContext';
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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  // 新規登録処理
  const signUpHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const inputData: InputData = {
      name,
      email,
      password,
    };

    // バリデーションエラーがある場合は、処理終了
    if (!validate(inputData)) {
      return;
    }

    try {
      await signUpUser(inputData);
      window.location.href = '/users/login';
    } catch (error) {
      throw new Error(error);
    }
  };

  // バリデーションチェック
  const validate = (inputData: InputData): boolean => {
    const valiedaedErrors = { ...errors };
    let isValid = true;

    (Object.keys(inputData) as (keyof InputData)[]).forEach(key => {
      const value = inputData[key];
      switch (key) {
        case 'name':
          if (validator.isEmpty(value)) {
            valiedaedErrors.name = '名前は必須です。';
          } else {
            valiedaedErrors.name = '';
          }
          break;
        case 'email':
          if (validator.isEmpty(value)) {
            valiedaedErrors.email = 'メールアドレスは必須です。';
          } else if (!validator.isEmail(value)) {
            valiedaedErrors.email = 'メールアドレスを入力してください。';
          } else {
            valiedaedErrors.email = '';
          }
          break;
        case 'password':
          if (!validator.isLength(value, { min: 8 })) {
            valiedaedErrors.password = '8文字以上で入力してください。';
          } else if (validator.isFullWidth(value) || validator.isAlpha(value) || validator.isNumeric(value)) {
            valiedaedErrors.password = '半角英字、数字を含むパスワードを入力ください。';
          } else if (validator.isUppercase(value)) {
            valiedaedErrors.password = '半角英小文字を含めてください。';
          } else if (validator.isLowercase(value)) {
            valiedaedErrors.password = '半角英大文字を含めてください。';
          } else {
            valiedaedErrors.password = '';
          }
          break;
        default:
          break;
      }
    });
    setErrors(valiedaedErrors);

    Object.values(valiedaedErrors).forEach(value => {
      if (value !== '') {
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>アカウントを新規作成</h2>
        <form onSubmit={signUpHandler} noValidate>
          <div className="name">
            <label htmlFor="name">
              名前
              <span>*</span>
            </label>
            <input
              type="text"
              className={errors.name ? 'error' : undefined}
              placeholder="例 : 山田太郎"
              name="name"
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
