export const MIN_LENGTH = 4;
export const MAX_LENGTH = 12;
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

export const MSG = {
  MIN_LENGTH_4: "최소 4글자를 입력해야 합니다.",
  MIN_LENGTH_6: "최소 6글자를 입력해야 합니다.",
  MAX_LENGTH_12: "최대 12글자를 입력해야 합니다.",
  FOBIDDEN_USERNAME: "사용이 금지된 이름입니다.",
  EXISTED_USERNAME: "이미 존재하는 이름입니다.",
  EXISTED_EMAIL: "이미 존재하는 이메일입니다.",
  NOT_EXISTED_TOKEN: "존재하지 않는 인증번호입니다.",
  NOT_EXISTED_EMAIL: "존재하지 않는 이메일입니다.",
  ONLY_TEXT: "문자만 입력이 가능합니다.",
  ONLY_NUMBER: "숫자만 입력이 가능합니다.",
  INVALID_EMAIL: "이메일 형식이 아닙니다.",
  INVALID_PASSWORD: "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.",
  PASSWORD_MISMATCH: "두 비밀번호가 일치하지 않습니다.",
  UNABLED_NUMBER: "사용할 수 없는 전화번호 입니다.",
  NOT_ENOUGH_CODE: "여섯 자리 숫자를 입력해주세요.",
  WRONG_PASSWORD: "비밀번호가 틀렸습니다.",
  REQUIRED: "필수로 입력해야 하는 값입니다.",
};

export const SIZE = 3;
