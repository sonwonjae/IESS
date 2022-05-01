type ValidityMessage = {
  -readonly [key in keyof ValidityState]?: string;
};

const validityMessage: ValidityMessage = {
  patternMismatch:
    '하나 이상의 문자와 숫자를 포함한 8자리 이상의 패스워드를 입력해주세요.',
};

function getInputValidityMessage(validity: ValidityState) {
  for (let key in validityMessage) {
    const tempKey = key as keyof ValidityState;

    if (validity[tempKey]) {
      return validityMessage[tempKey];
    }
  }
}

export { getInputValidityMessage };
