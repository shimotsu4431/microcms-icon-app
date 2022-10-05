import { microcmsUrl } from '../config/microcms';
import { HEX, Variants } from '../pages';

export type PostData = {
  name: string;
  variant: Variants;
  imageUrl: string;
  colors: HEX[];
};

type Message = {
  id?: string; // iFrame識別子
  title?: string;
  description?: string;
  imageUrl?: string;
  updatedAt?: Date;
  data: PostData;
};

type Data = {
  id: string;
  message: Message;
};

type StyleMessage = {
  height: number;
};

type Style = {
  id: string;
  message: StyleMessage;
};

export const microcmsPostData = (data: Data) => {
  window.parent.postMessage(
    {
      ...data,
      action: 'MICROCMS_POST_DATA',
    },
    microcmsUrl
  );
};

export const microcmsUpdateStyle = (style: Style) => {
  window.parent.postMessage(
    {
      ...style,
      action: 'MICROCMS_UPDATE_STYLE',
    },
    microcmsUrl
  );
};
