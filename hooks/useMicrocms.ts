import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { microcmsPostData, microcmsUpdateStyle } from '../lib/microcms';

type UseMicrocms = () => [
  any | undefined | null,
  Dispatch<SetStateAction<any | null>>,
  (item: any) => void
];

export const useMicrocms: UseMicrocms = () => {
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (
        e.isTrusted === true &&
        e.data.action === 'MICROCMS_GET_DEFAULT_DATA'
      ) {
        setId(e.data.id);
        setData(e.data.message?.data);
        microcmsUpdateStyle({
          id: e.data.id,
          message: {
            height: 500,
          },
        });
      }
    });
  }, []);

  const submitData = useCallback(
    (item: any) => {
      setData(item);
      microcmsPostData({
        id,
        message: {
          title: item.name,
          imageUrl: item.imageUrl,
          description: `variant: ${item.variant}`,
          updatedAt: new Date(),
          data: item,
        },
      });
    },
    [id]
  );

  return [data, setData, submitData];
};
