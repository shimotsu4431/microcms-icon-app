import type { NextPage } from 'next';
import Avatar from 'boring-avatars';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/Home.module.css';
import { colorPalette } from '../config/colorPalette';
import { FaRandom } from 'react-icons/fa';

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
  const [name, setName] = useState<string>('Aaron Donald');
  const [selectedVariant, setSelectedVariant] = useState<Variants>('beam');

  const [colors, setColors] = useState<HEX[]>(colorPalette[0]);

  const handleRandomPalette = useCallback(() => {
    const MIN = 0;
    const MAX = 11;

    setColors(colorPalette[Math.floor(Math.random() * (MAX + 1 - MIN)) + MIN]);
  }, []);

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
                  onChange={() => setSelectedVariant(item)}
                  className={styles.radioButton}
                />
              </label>
            ))}
          </div>
        </div>
        <div className={styles.form}>
          <h2 className={styles.title}>Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
