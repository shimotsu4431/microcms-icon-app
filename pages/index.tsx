import type { NextPage } from 'next';
import Avatar from 'boring-avatars';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/Home.module.css';
import { colorPalette } from '../config/colorPalette';
import { FaRandom } from 'react-icons/fa';
import { useMicrocms } from '../hooks/useMicrocms';

type Variants = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
const variants: Variants[] = [
  'beam',
  'marble',
  'pixel',
  'sunset',
  'ring',
  'bauhaus',
];

export type HEX = `#${string}`;

const Index: NextPage = () => {
  const [data, setData, submitData] = useMicrocms();
  const [name, setName] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<Variants>('beam');

  const [colors, setColors] = useState<HEX[]>(colorPalette[0]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSelectedVariant(data.variant);
      setColors(data.colors);
    }
  }, [data]);

  const makeColorCodes = () => {
    const arr = colors.map((c) => c.slice(1));

    return arr.join(',');
  };

  const handleSubmit = () => {
    const iconSize = 60;
    const imageUrl = `https://source.boringavatars.com/${selectedVariant}/${iconSize}/${name}?colors=${makeColorCodes()}`;

    submitData({
      imageUrl,
      name,
      variant: selectedVariant,
      colors,
    });
  };

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

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, selectedVariant, colors]);

  if (data === null) return null;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.avatar}>
          <Avatar
            size={100}
            name={name}
            variant={selectedVariant}
            colors={colors}
          />
        </div>
        <div>
          <h2>Colors</h2>
          <div className={styles.colors}>
            {colors.map((color) => (
              <div
                key={color}
                className={styles.color}
                style={{ backgroundColor: `${color}` }}
              ></div>
            ))}
            <button
              onClick={handleRandomPalette}
              className={styles.randomButton}
            >
              <FaRandom />
              Random Palette
            </button>
          </div>
          <h2>Variant</h2>
          <div>
            {variants.map((item: Variants) => (
              <label
                key={item}
                className={clsx([
                  styles.label,
                  item === selectedVariant && styles.isSelected,
                ])}
              >
                {item}
                <input
                  type="radio"
                  name={name}
                  value={selectedVariant}
                  checked={item === selectedVariant}
                  onChange={() => handleSelectVariant(item)}
                  className={styles.radioButton}
                />
              </label>
            ))}
          </div>
        </div>
        <div className={styles.form}>
          <h2 className={styles.title}>Name</h2>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleInputName(e)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
