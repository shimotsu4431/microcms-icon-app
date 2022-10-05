import { microcmsUrl } from '../config/microcms';

type Message = {
  id?: string; // iFrame識別子
  title?: string;
  description?: string;
  imageUrl?: string;
  updatedAt?: Date;
  data: any;
};

type Data = {
  id: string;
  message: Message;
};

type Style = {
  id: string;
  message: any;
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
