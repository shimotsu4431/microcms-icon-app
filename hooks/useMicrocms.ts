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

  // 管理画面を開いた際、すでに登録されているデータがあれば取得する
  useEffect(() => {
    console.log('===============================');
    window.addEventListener('message', (e) => {
      console.log('event');
      console.log('e.data', e.data);
      if (
        e.isTrusted === true &&
        e.data.action === 'MICROCMS_GET_DEFAULT_DATA'
      ) {
        setId(e.data.id);
        setData(e.data.message?.data);
        microcmsUpdateStyle({
          id: e.data.id,
          message: {
            height: 400,
          },
        });
      }
    });
  }, []);

  // 任意の書影をクリック時（管理画面に送信したいとき）
  const submitData = useCallback(
    (item: any) => {
      setData(item);
      microcmsPostData({
        id,
        message: {
          data: item, // APIのレスポンスとなる部分
        },
      });
    },
    [id]
  );

  return [data, setData, submitData];
};
