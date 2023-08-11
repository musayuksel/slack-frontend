import { type Dispatch } from 'react';

export type UseSessionStorageResult<T> = readonly [T, Dispatch<React.SetStateAction<T>>];
