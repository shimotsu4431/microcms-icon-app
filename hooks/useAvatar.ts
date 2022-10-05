import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { colorPalette } from '../config/colorPalette';
import { PostData } from '../lib/microcms';
import { HEX, Variants } from '../pages';

type UseAvatar = (
  data: PostData | null
) => [
  boolean,
  string,
  Variants,
  HEX[],
  (item: Variants) => void,
  () => void,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (colors: HEX[]) => string
];

export const useAvatar: UseAvatar = (data: PostData | null) => {
  const [name, setName] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<Variants>('beam');
  const [colors, setColors] = useState<HEX[]>(colorPalette[0]);
  const [mounted, setMounted] = useState<boolean>(false);

  const handleSelectVariant = (item: Variants) => {
    setSelectedVariant(item);
  };

  const handleRandomPalette = useCallback(() => {
    const MIN = 0;
    const MAX = 11;
    const randomNum = Math.floor(Math.random() * (MAX + 1 - MIN)) + MIN;

    setColors(colorPalette[randomNum]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const makeColorCodes = (colors: HEX[]) => {
    const arr = colors.map((c) => c.slice(1));

    return arr.join(',');
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSelectedVariant(data.variant);
      setColors(data.colors);

      // data.name だけ取得が遅れるので暫定的にこうしておく
      setTimeout(() => {
        setMounted(true);
      }, 300);
    }
  }, [data]);

  return [
    mounted,
    name,
    selectedVariant,
    colors,
    handleSelectVariant,
    handleRandomPalette,
    handleInputName,
    makeColorCodes,
  ];
};
