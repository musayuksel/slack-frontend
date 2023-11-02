import { ISignUpUserWithCognitoArgs } from '../../utils';

export type TSignUpFormProps = {
  userInfos: ISignUpUserWithCognitoArgs;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
