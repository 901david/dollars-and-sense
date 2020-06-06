import { getValidator } from './Validations';
describe('Validators', () => {
  describe('Email Validator', () => {
    describe('when email is valid', () => {
      test('should return true', () => {
        const results = getValidator('email')!('me@me.com');
        expect(results).toEqual({
          isValid: true,
          errors: [],
        });
      });
    });

    describe('when email is invalid', () => {
      test('should return false when no @', () => {
        const results = getValidator('email')!('meme.com');
        expect(results).toEqual({
          isValid: false,
          errors: ['Email must contain an @ and a . to be valid'],
        });
      });

      test('should return false when no .', () => {
        const results = getValidator('email')!('me@mecom');
        expect(results).toEqual({
          isValid: false,
          errors: ['Email must contain an @ and a . to be valid'],
        });
      });

      test('should return false when no . or @', () => {
        const results = getValidator('email')!('memecom');
        expect(results).toEqual({
          isValid: false,
          errors: ['Email must contain an @ and a . to be valid'],
        });
      });
    });
  });
  describe('PassWord Validator', () => {
    describe('When password is Valid', () => {
      test('should return true for valid password', () => {
        const results = getValidator('password')!('Pa$$w0rd');
        expect(results).toEqual({ isValid: true, errors: [] });
      });
    });
  });
});
