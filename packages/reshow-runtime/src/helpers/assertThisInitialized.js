import refError from './refError';

export default function _assertThisInitialized(self) {
  if (self === void 0) {
    throw refError();
  }

  return self;
}
