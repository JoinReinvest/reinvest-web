import { TextAreaCharacterCounter } from './CharacterCounter';
import { TextAreaDefault } from './Default';

export const TextArea = Object.assign(TextAreaDefault, { Counter: TextAreaCharacterCounter });
