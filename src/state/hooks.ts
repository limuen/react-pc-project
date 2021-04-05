import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RoutState } from './store';

export const useSelector: TypedUseSelectorHook<RoutState> = useReduxSelector;
